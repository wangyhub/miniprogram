// pages/meeting/seat/seatInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    seat_row: '',  //用户座位行
    seat_cell: '', //用户座位列
    count_row: [], //会场座位总行数
    count_cell: [], //会场座位总列数
    platform: [],
    seatInfo: [{
      startTimeStr: '',
      endTimeStr: '',
      subject: '',
      placeAddress: ''
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var url = getApp().globalData.url;
    var id = options.agendaId;
    var userId = wx.getStorageSync('userId');
    var that = this;
    wx.request({
      url: url + '/seatDetails?callback=JSONP_CALLBACK',
      data: {
        id: id,
        userId: userId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        var data = JSON.parse(res.data.replace('JSONP_CALLBACK(', '').replace('})', '}'));
        if (data.status == '200') {
          var resMes = data.data;
          resMes.endTimeStr = resMes.endTimeStr.substring(11, 16);
          var stage = new Array(resMes.platform); //定义主席台长度的数组
          var seatNo = resMes.seatNo.split("_"); //获取用户的坐席
          var regionRow = new Array(resMes.regionRow); //定义会场座次的总行数数组
          //获取坐席的列表
          var region = resMes.region; //数据为：cccccc=ccccc=ccccccccccccccccc
          var countRow = region.split("");
          var countNum = new Array(countRow.length);
          var num = 1;
          for (var i = 0; i < countRow.length; i++){
            if (countRow[i] == 'c') {
              countNum[i] = num;
              num++;
            } else {
              countNum[i] = '';
            }
          }
          that.setData({
            seat_row: seatNo[0],
            seat_cell: seatNo[1],
            platform: stage,
            count_row: regionRow,
            count_cell: countNum,
            seatInfo: resMes
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
})