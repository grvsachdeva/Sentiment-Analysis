const route = require('express').Router()
var axios = require('axios');
var querystring = require('querystring');

// --------------- Google API ---------------------------------------------------
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



// -------------- AYLIEN API -------------------
// var AYLIENTextAPI = require('aylien_textapi');
// var textapi = new AYLIENTextAPI({
//   application_id: "a949ce6b",
//   application_key: "dd25a25ea9551592e08e8c8c76fb6487"
// });
//
// route.post('/',(req,res) => {
//
// // console.log(req.body.test_text);
//
// textapi.sentiment({
//   'text': req.body.test_text
// }, function(error, response) {
//   if (error === null) {
//     console.log(response);
//     res.status(200).send(response);
//   }else{
//     console.log(error);
//   }
// });
//
// })

var AWS = require("aws-sdk");
var comprehend = new AWS.Comprehend({
  accessKeyId: "AKIAJHCDGGJ4VHBHAHEA",
  secretAccessKey: "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",
  region: "us-east-1"
});


route.post('/',(req,res) => {

  console.log(req.body.test_text);
  

  var params = {
    LanguageCode: "en",
    TextList: [req.body.test_text]
  };
  comprehend.batchDetectSentiment(params, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data.ResultList[0].SentimentScore);
      console.log(data);
      res.status(200).send(data.ResultList[0]);
    }
  });
})


route.post('/scrapy',(req,res) => {

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  const requestBody = querystring.stringify({
      project: '373618',
      apikey: '722c6a6fe309462498c368ff58dad14e',
      spider: req.body.website,
      search: req.body.search_term
  })
  
axios.post('https://app.scrapinghub.com/api/run.json', requestBody, config)
.then((res) => {
  console.log(res);
}).catch((error) => {
  console.log(error);
})


  
  console.log("In API: ",req.body.search_term,"  ",req.body.website);  

  
  // function callback(error, response, body) {
  //     if (!error && response.statusCode == 200) {
  //         console.log("Response:", body);
  //     }else{
  //       console.log("Error:", error);
  //     }
  // }
  
  // request(options, callback);
  

  // var params = {
  //   LanguageCode: "en",
  //   TextList: [req.body.test_text]
  // };
  // comprehend.batchDetectSentiment(params, function(err, data) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log(data.ResultList[0].SentimentScore);
  //     console.log(data);
  //     res.status(200).send(data.ResultList[0]);
  //   }
  // });
})

exports = module.exports = route
