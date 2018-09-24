// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//
// var request = new XMLHttpRequest();
//
// request.open('POST', 'https://private-5a41f-theysay.apiary-mock.com/v1/sentiment');
//
// request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
//
// request.onreadystatechange = function () {
//   if (this.readyState === 4) {
//     console.log('Status:', this.status);
//     console.log('Headers:', this.getAllResponseHeaders());
//     console.log('Body:', this.responseText);
//   }
// };
//
// var body = {
//   'text': 'Hello world',
//   'bias': {
//     'positive': 0,
//     'neutral': 0,
//     'negative': 0
//   }
// };
//
// request.send(JSON.stringify(body));
