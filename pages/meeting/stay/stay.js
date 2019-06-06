// pages/meeting/stay/stay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: '',
    latitude: '',
    stayInfo: [{
      hotelName: '',
      hotelAddress: '',
      stayTimeStr: '',
      leaveTimeStr: '',
      hotelPhone: '',
      stayNotice: ''
    }],
    markers: [{
      iconPath: '/resources/others.png',
      id: 0,
      latitude: '',
      longitude: '',
      width: 50,
      height: 50
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var url = getApp().globalData.url;
    var meetingId = wx.getStorageSync('meetingId');
    var userId = wx.getStorageSync('userId');
    var that = this;
    wx.request({
      url: url + '/getStayInfo?callback=JSONP_CALLBACK',
      data: {
        userId: userId,
        meetingId: meetingId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        var data = JSON.parse(res.data.replace('JSONP_CALLBACK(', '').replace('})', '}'));
        if (data.status == '200') {
          var stay = data.data;
          var XY = that.bMapTransQQMap(stay.pointX, stay.pointY);
          that.setData({
            longitude: XY.lng,
            latitude: XY.lat,
            stayInfo: stay,
            markers: [{
              latitude: XY.lat,
              longitude: XY.lng,
            }]
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
  bMapTransQQMap: function (lng, lat) {
    let x_pi = 3.14159265358979324 * 3000.0 / 180.0;
    let x = lng - 0.0065;
    let y = lat - 0.006;
    let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
    let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
    let lngs = z * Math.cos(theta);
    let lats = z * Math.sin(theta);
    return {
      lng: lngs,
      lat: lats
    }
  }

})