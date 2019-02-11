const https = require("https");
var medium_url, gizmodo_url, encodedURI;
var axios = require("axios");

async function start(topic) {
  encodedURI = encodeURIComponent(topic);
  medium_url = "https://medium.com/search?q=" + encodedURI;
  gizmodo_url = "https://gizmodo.com/search?q=" + encodedURI;
  console.log(medium_url);
  console.log(gizmodo_url);
  axios
    .get(
      `http://localhost:9080/crawl.json?spider_name=articles&url=${medium_url}`
    )
    .then(function(response) {
      console.log(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
  axios
    .get(
      `http://localhost:9080/crawl.json?spider_name=gizmodo&url=${gizmodo_url}`
    )
    .then(function(response) {
      console.log(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
}

start("face unlock");
