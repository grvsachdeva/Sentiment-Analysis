const route = require('express').Router()

// Google API

// var axios = require('axios');
//
// route.post('/',(req,res) => {
//
// // console.log(req.body.test_text);
//
// const API_KEY = 'AIzaSyAU-FIlNOlPwKq6Aq8uX9JpMZr9ycQSOmE';
// let url_var = `https://language.googleapis.com/v1/documents:analyzeSentiment?key=${API_KEY}`;
//
//   axios.post(url_var,{
//     "document":{
//         "type":"PLAIN_TEXT",
//         "content": req.body.test_text
//     },
//     "encodingType": "UTF8"
//   }).then(function(data){
//       // console.log(data.data.documentSentiment);
//       res.status(200).send(data.data.documentSentiment)
//   }).catch(function(error){
//     console.log(error);
//   })
// })

var AYLIENTextAPI = require('aylien_textapi');
var textapi = new AYLIENTextAPI({
  application_id: "a949ce6b",
  application_key: "dd25a25ea9551592e08e8c8c76fb6487"
});

route.post('/',(req,res) => {

// console.log(req.body.test_text);

textapi.sentiment({
  'text': req.body.test_text
}, function(error, response) {
  if (error === null) {
    console.log(response);
    res.status(200).send(response);
  }else{
    console.log(error);
  }
});

})


exports = module.exports = route
