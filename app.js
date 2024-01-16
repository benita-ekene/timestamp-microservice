let express = require('express');
let app = express();
let bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json());




module.exports = app;





