// pages/material/material.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    file:{
      fileName: '',
      fileId: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var url = getApp().globalData.url;
    var id = wx.getStorageSync('meetingId');
    console.log("meetingId="+id);
    var that = this;
    wx.request({
      url: url +'/findFileList?callback=JSONP_CALLBACK',
      data: {
        meetId: id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res){
        var data = JSON.parse(res.data.replace('JSONP_CALLBACK(', '').replace('})', '}'));
        var entity = data.data;
        var newFileName;
        var newName = [];
        for (var i in entity) {        //遍历JSON数组
          let name = entity[i].filename;     //获取每个文件的名字
          let id = entity[i].fileId;
          if (name.indexOf(".") != -1) {       //判断名字是否包括.这个字符串
            var first = name.split(".")[0];  //截取前面的文件名
            var last = name.split(".")[1];  //截取后面的文件类型
            if (first.length >= 16) {
              var firstName = first.substr(0, 14);
              newFileName = firstName + "...." + last;
            } else {
              newFileName = name;
            }
            newName.push({ 'fileName': newFileName, 'fileId': id });
          }
        }
        that.setData({
          file: newName
        })
      },
      fail(err){
        console.log("err="+err);
      }
    })
  },

  downLoad: function(event){
    var fileId = event.target.dataset.id;
    const downloadTask = wx.downloadFile({
      url: getApp().globalData.url + '/fileDownLoad?id=' + fileId,
      success: function(res){
        var filePath = res.tempFilePath;
        // 查看下载的文件列表
        //wx.getSavedFileList({
        //  success: function (res) {
        //    console.log(res.fileList);
        //  }
        //})
        // 打开文档
        wx.openDocument({
          filePath: filePath,
          fileType: 'docx',//必须指定查看文件类型
          success: function (res) {
            console.log('打开文档成功')
          },
          fail: function (res) {
            console.log(res)
          }
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
    downloadTask.onProgressUpdate((res) => {
      //console.log('下载进度', res.progress)
      //console.log('已经下载的数据长度', res.totalBytesWritten)
      //console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
    })
  }
})