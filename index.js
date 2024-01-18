// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

app.get('/api/:date?', (req, res) => {
  try {
    const dateString = req.params.date || '';
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      throw new Error('Invalid Date');
    }

    const response = {
      unix: date.getTime(),
      utc: date.toUTCString(),
    };

    res.json(response);
  } catch (error) {
    console.error(error); // Log errors for debugging
    res.status(400).json({ error: 'Invalid Date' });
  }
});

app.get("/", (req, res) => {
  // res.send('Hello Express')
  res.sendFile(__dirname +'/views/index.html')
})

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'), (req, res) => {
  res.sendFile(__dirname +'/public/style.css')
});



// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
