//app.js
App({
  onLaunch: function () {
    
    /**if(wx.getStorageSync('isLogin')){
      wx.switchTab({
        url: 'pages/meeting/meeting',
      })
    }else{
      wx.reLaunch({
        url: 'pages/login/login',
      })
    }
    */

    var that = this;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code!=null && res.code!=''){
          //获取用户微信信息
          wx.getUserInfo({
            success: function (res) {
              wx.setStorageSync('userInfo', res.userInfo);//存储userInfo
            }
          })
          var d = that.globalData;//这里存储了appid、secret、token串  
          console.log("d.appId=" + d.appId + "d.secret=" + d.secret);
          var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + d.appId + '&secret=' + d.secret + '&js_code=' + res.code + '&grant_type=authorization_code';
          wx.request({
            url: l,
            data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
            // header: {}, // 设置请求的 header  
            success: function (res) {
              var obj = {};
              obj.openid = res.data.openid;
              obj.expires_in = Date.now() + res.data.expires_in;
              obj.unionid = res.data.unionid;
              console.log("res.data=" + res.data);
              console.log("obj.openid=" + obj.openid + " obj.expires_in=" + obj.expires_in + " obj.unionid=" + obj.unionid);
              //console.log(obj);
              //wx.setStorageSync('user', obj);//存储openid  
            }
          });
        }else{
          console.log('获取用户登录态失败！' + res.errMsg);
        }
      }
    })
    
  },
  globalData: {
    userInfo: null,
    url: "http://39.155.223.208:9080/meeting/a/meeting/mobile/tbMobile",
    appId: 'wx478373945bfbbb7c',
    secret: '74cf7d9bbd4252dce010b716d379f9e7'
  }
})