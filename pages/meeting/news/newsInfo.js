// pages/meeting/news/newsInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: '',
    newsInfo:[{
      newsId: '',
      title: '',
      issuer: '',
      newsTime: '',
      content: ''
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var url = getApp().globalData.url;
    var newsId = options.newsId;
    var newsUrl = url + "/lookNews?id="+newsId;
    this.setData({
      url: newsUrl
    })
    /**var that = this;
    wx.request({
      url: url + '/findNewsDetails?callback=JSONP_CALLBACK',
      data: {
        id: newsId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        var data = JSON.parse(res.data.replace('JSONP_CALLBACK(', '').replace('})', '}'));
        if (data.status == '200') {
          var resMes = data.data;
          resMes.content = resMes.content.replace("div","view");
          console.log("newsInfo="+resMes.content);
          that.setData({
            newsInfo: resMes
          })
        } else {
          wx.showToast({
            title: '网络异常',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })*/
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})