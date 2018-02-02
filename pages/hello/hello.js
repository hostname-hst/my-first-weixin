// pages/hello/hello.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  ontap:function(){
    // wx.navigateTo({
    //   url: '/pages/posts/posts',
    //   success:function(e){
    //     console.log(e)
    //   },
    //   fail:function(e){
    //     console.log(e)
    //   }
    // })
    // wx.redirectTo({
    //   url: '/pages/posts/posts',
    // })
    wx.switchTab({
      url: "/pages/posts/posts"
    });
  }
})