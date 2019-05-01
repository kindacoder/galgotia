var mongoose=require('mongoose');
mongoose.connect('mongodb://user123:user123@ds031873.mlab.com:31873/galgotiaproject');
var Schema=mongoose.Schema;
var urlSchema=new Schema({
  email:String,
  url:String,
})

var Url=mongoose.model('url2',urlSchema);
module.exports=Url;
