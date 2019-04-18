// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    phone: '',

    code: ''

  },

  // 获取输入的手机号 
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  // 获取输入密码 
  passwordInput: function (e) {
    this.setData({
      code: e.detail.value
    })
  },

  // 登录 

  login: function () {
    if (this.data.phone.length == 0 || this.data.code.length == 0) {
      wx.showToast({
        title: '手机号和验证码不能为空',
        icon: 'none',
        duration: 2000
      })
      return false;
    } 
    var meetingUrl = getApp().globalData.url;
    wx.request({
      url: meetingUrl +'/checkUser?callback=JSONP_CALLBACK',
      data: {
        phone: this.data.phone
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        var data = JSON.parse(res.data.replace('JSONP_CALLBACK(', '').replace('})', '}'));
        if(data.status=='200'){
          var user = data.data;
          wx.setStorageSync("isLogin", true);
          wx.setStorageSync("userId", user.userId);
          wx.setStorageSync("userName", user.userName);
          wx.setStorageSync("phone", user.phone);
          //如果用户没有根据邀请码绑定会议，那么跳转到绑定会议页面
          if (user.meetingId == "") {
            //that.navCtrl.push(BindMeetingPage);
            wx.reLaunch({
              url: 'pages/bindMeeting/bindMeeting',
            })
          } else {
            wx.setStorageSync('meetingId', user.meetingId);
            wx.setStorageSync('meetingName', user.meetingName);
            wx.switchTab({
              url: 'pages/meeting/meeting',
            })
          }
        }
      }
    })
    
  } 
})