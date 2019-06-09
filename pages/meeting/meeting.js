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
  },

  //跳转到大会地图页面
  goMap: function (event){
    wx.navigateTo({
      url: '../meeting/map/map',
    })
  },

  //跳转到接送服务页面
  goShuttle: function (event){
    wx.navigateTo({
      url: '../meeting/shuttle/shuttle',
    })
  },

  //跳转到住宿安排页面
  goStay: function (event){
    wx.navigateTo({
      url: '../meeting/stay/stay',
    })
  },

  //跳转到用餐安排页面
  goMeals: function (event){
    wx.navigateTo({
      url: '../meeting/meals/meals',
    })
  },

  //跳转到会场座次列表页面
  goSeat: function (event){
    wx.navigateTo({
      url: '../meeting/seat/seatList',
    })
  },

  //跳转到报名参会页面
  goEnroll: function (event){
    wx.navigateTo({
      url: '../meeting/enroll/enroll',
    })
  },

  //跳转到新闻列表页面
  goNews: function (event){
    wx.navigateTo({
      url: '../meeting/news/news',
    })
  }
})