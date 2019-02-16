const route = require('express').Router()
var axios = require('axios');
var querystring = require('querystring');

const fetch_scrapped_data = async(spider_name) => {

  const req_params = {
      project: '373618',
      apikey: '722c6a6fe309462498c368ff58dad14e',
      spider: spider_name, 
      fields: "title,text",
      include_headers: 1
  }
  try{
    return axios.get('https://app.scrapinghub.com/api/items.json', {params: req_params})
  }catch(error){
  console.log("Error: ", error);
  }
}

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
  var encodedURI, spider_name = req.body.website;
  if( spider_name === 'gizmodo')
    encodedURI = "https://gizmodo.com/search?q=" + encodeURIComponent(req.body.search_term);
  else if(spider_name === 'articles')
    encodedURI = "https://medium.com/search?q=" + encodeURIComponent(req.body.search_term);
  else if(spider_name === 'techradar')
    encodedURI = "https://www.techradar.com/search?searchTerm=" + encodeURIComponent(req.body.search_term);
  else
    console.log("Invalid Selection");

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  const requestBody = querystring.stringify({
      project: '373618',
      apikey: '722c6a6fe309462498c368ff58dad14e',
      spider: spider_name,
      search_url: encodedURI 
  })
  
axios.post('https://app.scrapinghub.com/api/run.json', requestBody, config)
.then((res) => {
  console.log("Request success: ",res);
}).catch((error) => {
  console.log("Error: ", error);
})

//  const scrapping_data = async () => {
//   scraped_data = fetch_scrapped_data(spider_name)
//     .then(response => {
//       if (response) {
//         console.log(response);
//       }
//     })
//     .catch(error => {
//       console.log(error)
//     })
// }

// scrapping_data();

})

exports = module.exports = route
