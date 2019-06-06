// pages/meeting/meals/meals.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showView: false,
    currentTabsIndex: '',
    mealList: [{
      mealTimeDay: '',
      mealType: '',
      mealTime: '',
      mealName: '',
      mealAddress: '',
      isTable: '',
      tableNum: ''
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
      url: url + '/getMealList?callback=JSONP_CALLBACK',
      data: {
        meetingId: meetingId,
        userId: userId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        var data = JSON.parse(res.data.replace('JSONP_CALLBACK(', '').replace('})', '}'));
        if (data.status == '200') {
          var meals = data.data;
          //循环接口返回的数据，进行修改
          meals.forEach((item) => {
            item.mealTimeDay = item.mealTime.substring(5,10);
            switch (item.mealType) {
              case '1':
                item.mealType = '早餐';
                break;
              case '2':
                item.mealType = '午餐';
                break;
              default:
                item.mealType = '晚餐';
            };
            if (item.isTable == '0'){
              item.tableNum = '自助餐';
            }else{
              if (item.tableNum != null && item.tableNum != ''){
                item.tableNum = item.tableNum+'桌';
              }else{
                item.tableNum = '无分桌信息';
              }
            }
          });
          that.setData({
            mealList: meals
          });
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
   * 页面用餐信息的显示或隐藏
   */
  onChangeShowState: function (event) {
    var index = event.currentTarget.dataset['index'];
    var that = this;
    that.setData({
      showView: (!that.data.showView),
      currentTabsIndex: index
    })
  }
})