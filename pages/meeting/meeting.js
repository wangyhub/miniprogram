// pages/meeting/meeting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    meetingName: '',
    height: '',
    width: ''
  },

  onLoad: function(){
    //获取手机的宽和高
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        console.log(res.windowWidth);
        console.log(res.windowHeight);
        that.setData({
          height: res.windowHeight,
          width: res.windowWidth,
        })
      }
    })

    var name = wx.getStorageSync("userName");
    if(name!=null && name!=""){
      name+="，";
    }
    var meeting = wx.getStorageSync("meetingName");
    this.setData({
      userName: name,
      meetingName: meeting,
    })
  }
})