const express = require('express');
const session = require('express-session');

const app = express();

app.use('/', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/api', require('./routes/api').route);
app.set('port', (process.env.PORT || 4000));

app.listen(app.get('port'), function () {
   console.log("Node app is running at Port: ", app.get('port'));
});
