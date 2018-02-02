const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function convertToStarsArray(stars){
  var array=[],num=0;
  for(var i=0;i<5;i++){
    num = Math.floor(stars/2);
    if (i<num){
      array.push(1);
    }else{
      array.push(0);
    }
  }
  return array;
}
function http(url,callback) {
  wx.request({
    url: url,
    // data: ,
    header: {
      "Content-Type": "json"
    },
    method: 'GET',
    // dataType: json,
    // responseType: text,
    success: function(data) {
      // var data = res.data;
      callback(data)
    },
    fail: function(res) {},
    complete: function(res) {},
  })
}
module.exports = {
  formatTime: formatTime,
  convertToStarsArray: convertToStarsArray,
  http:http
}
