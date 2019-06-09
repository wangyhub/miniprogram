// pages/meeting/news/news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    news: [{
      newsId: '',
      title: '',
      newsTime: '',
      titleImg: '',
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var url = getApp().globalData.url;
    var meetingId = wx.getStorageSync("meetingId");
    var that = this;
    wx.request({
      url: url +'/findNewsList?callback=JSONP_CALLBACK',
      data: {
        newsId: meetingId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        var data = JSON.parse(res.data.replace('JSONP_CALLBACK(', '').replace('})', '}'));
        if (data.status == '200') {
          var resMes = data.data;
          that.setData({
            news: resMes
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
   * 跳转到新闻详情页面
   */
  goNewsInfo: function (event) {
    var newsId = event.currentTarget.dataset['index'];
    wx.navigateTo({
      url: '../news/newsInfo?newsId=' + newsId,
    })
  }
})