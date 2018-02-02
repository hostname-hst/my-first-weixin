var util = require("../../../../utils/util.js");
class Movie{
  constructor(url){
    this.url = url;
  }
  getMovieData(cb){
    this.cb = cb;
    util.http(this.url, this.processMovieData.bind(this));
    util.http(this.url, this.processMovieData.bind(this));
  }
  processMovieData(res) {
    // console.log(res.data.data.MovieDetailModel)                   
    var movie = {};
    movie = res.data.data.MovieDetailModel;
    this.cb(movie);
    
  }
  test(){
    console.log('I am testing')
  }
}
export { Movie }
