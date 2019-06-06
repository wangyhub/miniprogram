// pages/meeting/seat/seatList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    seatList: [{
      agendaId: '',
      agendaName: '',
      beginDateStr: '',
      endDateStr: ''
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var url = getApp().globalData.url;
    var seatId = wx.getStorageSync('meetingId');
    var that = this;
    wx.request({
      url: url + '/seatList?callback=JSONP_CALLBACK',
      data: {
        seatId: seatId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        var data = JSON.parse(res.data.replace('JSONP_CALLBACK(', '').replace('})', '}'));
        if (data.status == '200') {
          var seats = data.data;
          that.setData({
            seatList: seats
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

  /**
   * 跳转到座次详细的页面
   */
  goSeatInfo: function (event){
    var agendaId = event.currentTarget.dataset['index'];
    wx.navigateTo({
      url: '../seat/seatInfo?agendaId=' + agendaId,
    })
  }
})