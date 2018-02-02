var postDetailData = require('../../../data/posts-data.js');
var app = getApp();
Page({
  data: {
    isPlayingMusic:false
  },
  onLoad: function (options) {
    console.log(app)
    var postId = options.id;
    this.data.currentPostId = postId;
    var postData = postDetailData.postList[postId];
    this.setData({
      detailData: postData
    })
   var postsCollected = wx.getStorageSync("posts_collected");
   if (postsCollected){
     var postCollect = postsCollected[postId];
     this.setData({
       collected: postCollect
     })
   }else{
     postsCollected={};
     postsCollected[postId] = false;
     wx.setStorageSync("posts_collected", postsCollected)
   }
   this.setMusicMonitor();
   if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId == postId){
      this.setData({
        isPlayingMusic: true
      })
   }
  },
  onColletionTap:function(){
    // this.getCollectedSyn()；
    this.getCollectedAsy()
  },
  getCollectedSyn:function(){//同步操作
    var postsCollected = wx.getStorageSync('posts_collected');
    var postCollected = postsCollected[this.data.currentPostId];
    // 收藏变成未收藏，未收藏变成收藏
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    // this.showModel(postCollected, postsCollected);
    this.showToast(postCollected, postsCollected);
    // wx.setStorageSync("posts_collected", postsCollected);
    // this.setData({
    //   collected: postCollected
    // })
  },
  getCollectedAsy:function(){//异步操作
    var that = this;
    wx.getStorage({
      key: 'posts_collected',
      success: function (res) {
        var postsCollected = res.data;
        var postCollected = postsCollected[that.data.currentPostId];
        postCollected = !postCollected;
        postsCollected[that.data.currentPostId] = postCollected;
        that.showModel(postCollected,postsCollected);
      }
    })
  },
  showModel: function (postCollected, postsCollected){
    var that = this;
    wx.showModal({
      title: '收藏',
      content: postCollected?'收藏该文章':'取消收藏该文章',
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync("posts_collected", postsCollected);
          // wx.setStorage({
          //   key: "posts_collected",
          //   data: postsCollected
          // })
          that.setData({
            collected: postCollected
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  showToast: function (postCollected, postsCollected){
    wx.setStorageSync("posts_collected", postsCollected);
    this.setData({
      collected: postCollected
    })
    wx.showToast({
      title: postCollected?'收藏该文章':'取消收藏该文章',
      icon: 'succees',
      image: '',
      duration: 1000,
      mask: true,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  onShareTap:function(){
    wx.showActionSheet({
      itemList: [
        '分享给朋友',
        '分享到朋友圈',
        'QQ空间'
      ],
      success: function (res) {
        console.log(res.tapIndex)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  setMusicMonitor:function(){
    var that = this;
    wx.onBackgroundAudioPause(function(){
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
    });
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic = true;
    })
  },
  onMusicTap:function(event){
    var isPlayingMusic = this.data.isPlayingMusic;
    var postCurrentId = this.data.currentPostId;
    var postData = postDetailData.postList[postCurrentId];
    if (isPlayingMusic){
      wx.pauseBackgroundAudio()
      this.setData({
        isPlayingMusic:false
      })
      this.setData({
        isPlayingMusic: false
      })
      app.globalData.g_currentMusicPostId = postCurrentId;
    }else{
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImg: postData.music.coverImg
      })
      this.setData({
        isPlayingMusic: true
      })
      app.globalData.g_currentMusicPostId = postCurrentId;
    }
   
  }
})
