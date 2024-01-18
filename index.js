// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// app.get('/api/:date?', (req, res) => {
//   try {
//     const dateString = req.params.date || '';
//     const date = new Date(dateString);

//     if (isNaN(date.getTime())) {
//       throw new Error('Invalid Date');
//     }

//     const response = {
//       unix: date.getTime(),
//       utc: date.toUTCString(),
//     };

//     res.json(response);
//   } catch (error) {
//     console.error(error); // Log errors for debugging
//     res.status(400).json({ error: 'Invalid Date' });
//   }
// });


app.get("/api/:date?", (req, res) => {
  let date = req.params.date;

  if (!date) {
    // If no date is provided, return the current timestamp and UTC string
    const currentDate = new Date();
    return res.json({
      unix: currentDate.getTime(),
      utc: currentDate.toUTCString(),
    });
  }

  // Check if the provided date is a valid timestamp
  if (!isNaN(date)) {
    date = parseInt(date);
    return res.json({
      unix: date,
      utc: new Date(date).toUTCString(),
    });
  }

  // Check if the provided date is a valid string date
  const parsedDate = new Date(date);
  if (!isNaN(parsedDate.getTime())) {
    return res.json({
      unix: parsedDate.getTime(),
      utc: parsedDate.toUTCString(),
    });
  }

  // If the date is neither a valid timestamp nor a valid string date
  return res.json({ error: "Invalid Date" });
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
