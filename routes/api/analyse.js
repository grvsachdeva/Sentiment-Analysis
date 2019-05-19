const route = require("express").Router();
var axios = require("axios");
var querystring = require("querystring");

var AWS = require("aws-sdk");
var comprehend = new AWS.Comprehend({
  accessKeyId: "AKIAJHCDGGJ4VHBHAHEA",
  secretAccessKey: "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",
  region: "us-east-1"
});

route.post("/", (req, res) => {
  console.log(req.body.test_text);
  console.log(req.body.test_text.constructor.name);
  var params = {
    LanguageCode: "en",
    TextList: req.body.test_text
  };
  comprehend.batchDetectSentiment(params, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      comprehend.batchDetectKeyPhrases(params, function(error, result) {
        if (error) {
          console.log(error);
        } else {
          console.log(result.ResultList[0].KeyPhrases);
          console.log(result);
          console.log(data.ResultList[0].SentimentScore);
          console.log(data);
          var obj = new Object();
          obj.sentiment = data.ResultList[0];
          obj.entities = result.ResultList[0];

          //convert object to json string
          var string = JSON.stringify(obj);

          //convert string to Json Object
          var final = JSON.parse(string);
          console.log(final);
          res.status(200).send(final);
        }
      });
    }
  });
});

route.post("/scrapy", (req, res) => {
  var encodedURI,
    spider_name = req.body.website;
  if (spider_name === "hindustantimes")
    encodedURI =
      "https://hindustantimes.com/search?q=" +
      encodeURIComponent(req.body.search_term);
  else if (spider_name === "articles")
    encodedURI =
      "https://medium.com/search?q=" + encodeURIComponent(req.body.search_term);
  else if (spider_name === "techradar")
    encodedURI =
      "https://www.techradar.com/search?searchTerm=" +
      encodeURIComponent(req.body.search_term);
  else console.log("Invalid Selection");

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };

  const req_params = {
    project: "373618",
    apikey: "722c6a6fe309462498c368ff58dad14e",
    spider: spider_name,
    fields: "title,text",
    include_headers: 1
  };

  const requestBody = querystring.stringify({
    project: "373618",
    apikey: "722c6a6fe309462498c368ff58dad14e",
    spider: spider_name,
    search_url: encodedURI
  });

  axios
    .post("https://app.scrapinghub.com/api/run.json", requestBody, config)
    .then(result => {
      console.log("Request success: ", result);
      setTimeout(function() {
        let textArray = [];
        axios
          .get("https://app.scrapinghub.com/api/items.json", {
            params: req_params
          })
          .then(result => {
            for (x of result.data) {
              len = x.text.length;
              if (len >= 1 && len <= 4000) {
                textArray.push(x.text);
              } else if (len >= 1 && len > 4000) {
                textArray.push(x.text.substring(0, 4000));
              }
            }
            res.send(textArray);
          })
          .catch(error => {
            console.log("error", error);
          });
      }, 120000);
    })
    .catch(error => {
      console.log("Error: ", error);
    });
});

exports = module.exports = route;
