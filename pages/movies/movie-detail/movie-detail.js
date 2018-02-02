// var utils = require("../../../utils/util.js");
import { Movie } from "class/Movie.js"
Page({
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var movieId = options.movieId;
    var url = "http://m.maoyan.com/movie/" + movieId+".json";
    // utils.http(url,this.processMovieData);
    var movie = new Movie(url);
    var that = this;
       movie.test();                   
    console.log(movie)
    movie.getMovieData(function (movie) {
      that.setData({
        movie: movie
      })
    })
  },
  // processMovieData:function(res){
  //  console.log(res);
  //  var movie={};
  //  movie = res.data.MovieDetailModel;
  //  console.log(movie)
  //  this.setData({
  //    movie:movie
  //  })
  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  }
})