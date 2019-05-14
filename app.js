var express=require('express');
var app=express();
//port setup
var port=process.env.PORT || 5100;
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
var encoder=require('./encoder_decoder/encode');

var Url=require('./models/url')


///requiring keys from config:
var keys=require('./config/keys');
mongoose.connect(keys.mongo.dbURL,function(){
  console.log('database connected');
});

///connect to mongodb
// console.log(keys.mongo.dbuser);
// console.log(keys.mongo.dbpassword);



///using middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'))
///setting view engine
app.set('view engine','ejs');





///setting the get route to view the main page:)
app.get('/:email/:url',function(req,res){
  //save into database
  var email=req.params.email;
  var url=req.params.url;
  var newUrl=new Url({
    email:email,
    url:url,
  }).save(function(err){
    if(err){
      console.log(err);
    }
   res.send('URL updated into our database');
  });

})
// app.get('/privateashutosh',function(req,res){
//   res.render('user');
// })


//Handling the post request in the main setprototypeof
// app.post('/ticket',function(req,res){
//   var originalUrl=req.body.url;
// ///checkin gif the url is valid or not :)
//
// var regex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/
//   if(!regex.test(originalUrl)) {
//     res.render('error',{message:'not a valid url'})
//   } else {
//     //passing the originalurl to encoder to get the shorten url;
//     var shortenUrl=encoder(originalUrl);
//     // console.log(shortenUrl);
//     //save the url in database-
//     var newUrl=new Url({
//       ticket:originalUrl,
//       name:shortenUrl
//     }).save(function(err){
//       if(err){
//         console.log(err);
//       }
//       // var shortenFullUrl='http://localhost:5100/'+shortenUrl;
//        var shortenFullUrl = req.protocol + '://' + req.get('host') +'/'+ shortenUrl;
//       // console.log(shortenFullUrl);
//       res.render('shorten',{shortenUrl:shortenFullUrl});
//     });
//
//   }
//
// })



///add user
// app.post('/privateashutosh',function(req,res){
//   var name=req.body.name;
//   var email=req.body.email;
//   var ticket=req.body.ticket;
//
// ///checkin gif the url is valid or not :)
//
//
//
// })



////handling the get request to encode the shortenUrl and get the originalUrl
// app.get('/ticket',function(req,res){
//   ///access the parameter
//   var email=req.query.email;
//   var ticket=req.query.ticket;
//   console.log(email);
  // console.log(shortenUrl)
  ///query if shortenUrl is available in database
//   Url.findOne({'ticket':ticket},function(err,data){
//
//   if(err){
//     console.log('done ')
//   throw err;
//
//   console.log(err);
// }
//     else if(data.email==email){
//       res.render('certificate',{name:data.name,ticket:data.ticket});
//     }
//
//     else{
//       res.render('error');
//     }
//   })

// Url.findOne({'ticket':ticket}).then(function(user) {
//   if(!user) {
//     throw new Error('no user with that id')
//   }
//   // do something with user
//
//   if(user.email==email){
//
//      res.render('certificate',{name:user.name,ticket:user.ticket});
//      // res.send(user);
//   }
//   else{
//     res.render('notfound');
//   }
// }).catch(function(err) {
//   res.render('error');
// })
//
//
// })

app.listen(port,function(){
  console.log("Listening on port no ");
})
