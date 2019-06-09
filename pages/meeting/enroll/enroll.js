// pages/meeting/enroll/enroll.js

var dateTimePicker = require('../../../utils/dateTimePicker.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: '1', value: '男', checked: 'true' },
      { name: '0', value: '女' }
    ],
    isOrNot: [
      { name: '1', value: '是', checked: 'true' },
      { name: '0', value: '否' }
    ],
    departmentArray: [],
    objectIndex: 0,//默认显示位置
    showSendInfo: 1,//是否接送的信息 默认显示
    dateTimeArray1: null,
    dateTime1: null,
    join: [{
      userName: '',
      sex: '',
      companyId: '',
      position: '',
      phone: '',
      nation: '',
      email: '',
      comeNumber: '',
      comeStation: '',
      comeTime1: '',
      goNumber: '',
      goStation: '',
      goTime1: ''
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var url = getApp().globalData.url;
    var meetingId = wx.getStorageSync('meetingId');
    var userId = wx.getStorageSync('userId');
    //查询显示所有的单位
    this.getDepartments(url, meetingId);
    //获取用户报名信息
    this.getUserJoinInfo(url, userId, meetingId);

    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);

    this.setData({
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
    });
  },

  //查询所有单位集合
  getDepartments: function (url, meetingId) {
    var that = this;
    wx.request({
      url: url + '/getDepartmentList?callback=JSONP_CALLBACK',
      data: {
        meetingId: meetingId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        var data = JSON.parse(res.data.replace('JSONP_CALLBACK(', '').replace('})', '}'));
        if (data.status == '200') {
          var departmentList = data.data;
          that.setData({
            departmentArray: departmentList
          })
        } 
      }
    })
  },

  /**
   * 普通选择器2：
   */
  bindPickerChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      objectIndex: e.detail.value
    })
  },

  /**
   * 是否接送选择器
   */
  radioChange02: function (e) {
    var isSend = e.detail.value;
    this.setData({
      showSendInfo: isSend
    })
  },

  /**
   * 获取用户报名信息
   */
  getUserJoinInfo: function (url, userId, meetingId) {
    var that = this;
    wx.request({
      url: url + '/getJoinInfo?callback=JSONP_CALLBACK',
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
          var resData = data.data;
          var dList = that.data.departmentArray;
          var index = 0;
          for (var i = 0; i < dList.length; i++) {
            if (resData.companyId == dList[i].companyId) {
              index = i;
            }
          }
          that.setData({
            join: resData,
            objectIndex: index
          })
        }
      }
    })
  },

  /**
   * 提交表单
   */
  formSubmit: function (e) {
    console.log('form发生了submit事件，提交数据：', e)
  }

  
})