// pages/meeting/shuttle/shuttle.js 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showView: true,
    currentTabsIndex: '',
    tripList: [{
      remark: '',
      tripTimeStr: '',
      tripAddress: '',
      carModel: '',
      carNum: '',
      carMan: '',
      manPhone: ''
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var url = getApp().globalData.url;
    var id = wx.getStorageSync('meetingId');
    var userId = wx.getStorageSync('userId');
    var that = this;
    wx.request({
      url: url + '/tripList?callback=JSONP_CALLBACK',
      data: {
        tripId: userId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        var data = JSON.parse(res.data.replace('JSONP_CALLBACK(', '').replace('})', '}'));
        if (data.status == '200') {
          var resMes = data.data;
          that.setData({
            tripList: resMes
          })
        } else {
          wx.showToast({
            title: '网络异常',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },

  onChangeShowState: function (event) {
    var index = event.currentTarget.dataset['index'];
    var that = this;
    that.setData({
      showView: (!that.data.showView),
      currentTabsIndex: index
    })
  }
 
})