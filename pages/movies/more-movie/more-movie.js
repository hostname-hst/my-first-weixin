// pages/movies/more-movie/more-movie.js
var utils = require('../../../utils/util.js');
Page({
  data: {
    type: '',
    start: 0,
    currentUrl: '',
    inTheatersUrl: '',
    isEmpty: true,
    movies: {}
  },
  onLoad: function (options) {
    // var type = options.type;
    // console.log(options)
    // this.data.type = type;
    var url = "http://m.maoyan.com/movie/list.json?type=hot&offset=" + this.data.start + "&limit=20";
    this.data.currentUrl = url;
    this.getMovieListData(url);
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.type,
    })
  },
  getMovieListData: function (url) {
    var that = this;
    wx.request({
      url: url,
      header: {
        "Content-Type": "json"
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data.data.movies);
        var inTheatersUrl = res.data.data.movies;
        if (res.data.data.movies == '') {
          wx.showToast({
            title: '没有更多数据了',
          })
        }
        var movie = [];
        for (var i in inTheatersUrl) {
          var name = inTheatersUrl[i].nm;
          var stars = utils.convertToStarsArray(inTheatersUrl[i].sc)
          // console.log(stars)
          if (name.length >= 6) {
            name = name.substring(0, 6) + '...';
          }
          var temp = {
            "name": name,
            "score": inTheatersUrl[i].sc,
            "imgSrc": inTheatersUrl[i].img,
            "id": inTheatersUrl[i].id,
            "stars": stars
          }
          movie.push(temp);
        }
        var totalMovies = {};
        if (!that.data.isEmpty) {
          totalMovies = that.data.inTheatersUrl.concat(movie);
          that.setData({
            inTheatersUrl: totalMovies
          })
        } else {
          totalMovies = movie;
          that.setData({
            inTheatersUrl: totalMovies
          })
          that.data.isEmpty = false;
        }
        // console.log(that.data.inTheatersUrl);
        // wx.hideNavigationBarLoading();//加载完隐藏的动画
        wx.hideLoading();
      }
    })
  },
  scrolltolower: function () {
    console.log(this.data.start)
    this.data.start += 20;
    this.setData({
      start: this.data.start
    })
    var url = "http://m.maoyan.com/movie/list.json?type=hot&offset=" + this.data.start + "&limit=20";
    this.getMovieListData(url);
    // wx.showNavigationBarLoading();//加载等待动画
    wx.showLoading({
      title: '加载中...',
    })
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()

    wx.showNavigationBarLoading();
    this.data.inTheatersUrl = {};
    this.data.isEmpty = true;
    var url = "http://m.maoyan.com/movie/list.json?type=hot&offset=0" + "&limit=20";
    this.getMovieListData(url);
  },
  toMovieDetail: function (event) {
    var movieId = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../movie-detail/movie-detail?movieId=' + movieId,
    })
  }
})
