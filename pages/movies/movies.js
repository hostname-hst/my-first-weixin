var app = getApp();
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'inTheatersUrl':''
  },

  onLoad: function (options) {
    this.getMovieListData();
  },
  getMovieListData:function(url){
    var that = this;
    wx.request({
      url: "http://m.maoyan.com/movie/list.json?type=hot&offset=0&limit=9",
      header: {
        "Content-Type": "json"
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data.data.movies);
        var inTheatersUrl = res.data.data.movies;
        var movie = [];
        for (var i in inTheatersUrl){
          var name = inTheatersUrl[i].nm;
          var stars = utils.convertToStarsArray(inTheatersUrl[i].sc)
          console.log(stars)
          if (name.length>=6){
            name=name.substring(0,6)+'...';
          }
          var temp={
            "name": name,
            "score": inTheatersUrl[i].sc,
            "imgSrc": inTheatersUrl[i].img,
            "id": inTheatersUrl[i].id,
            "stars": stars
          }
          movie.push(temp);
        }
        that.setData({
          inTheatersUrl: movie
        })
      },
      fail: function (res) {

      }
    })
  },
  moreMovie:function(event){
    var movieType = event.currentTarget.dataset.type;
    console.log(movieType)
    wx.navigateTo({
      url: 'more-movie/more-movie?type=' + movieType,
    })
  },
  toMovieDetail: function (event) {
    var movieId = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'movie-detail/movie-detail?movieId=' + movieId,
    })
  }
})
