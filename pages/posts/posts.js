var postData = require('../../data/posts-data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ]
  },
  onGoDetail:function(event){
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: '/pages/posts/post-detail/post-detail?id=' + postId
    });
   
  },
  sweiperDetailPage:function(event){
    var postId = event.target.dataset.postid;
    wx.navigateTo({
      url: '/pages/posts/post-detail/post-detail?id=' + postId
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      postData : postData.postList
    })
  }
})
