// pages/meeting/enroll/enroll.js
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
    objectArray: [
      {
        id: 0,
        name: '美国'
      },
      {
        id: 1,
        name: '中国'
      },
      {
        id: 2,
        name: '巴西'
      },
      {
        id: 3,
        name: '日本'
      }
    ],
    objectIndex: 0,//默认显示位置
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //普通选择器2：
  bindPickerChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      objectIndex: e.detail.value
    })
  }
})