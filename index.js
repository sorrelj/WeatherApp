/**
 *  Node weather app
 *      modules: express,request,body-parser,dotenv
 *      api: open weather map (https://openweathermap.org/current)
 *      key: 
 * 
 */

/* Required node modules */
var express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
require('dotenv').load();


/* Global declarations */
var app = express();

let apiKey = process.env.WEATHER_API_KEY;
let country = "us";
let tempUnit = "imperial";

/* Use body parser */
app.use(bodyParser.urlencoded({ extended: true }));

/* Set view engine */
app.set('view engine', 'ejs')

/* Opens node server on port 3000 */
app.listen(3000, function () {
    console.log('App listening on port 3000!');
});

/* Get request for / */
app.get('/', function (req, res) {
    res.render('main');
});

/* Post request for / */
app.post('/getWeather', function (req, res) {
    let zipCode = req.body.zipInput;

    let weatherURL = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${country}&units=${tempUnit}&appid=${apiKey}`;

    request(weatherURL, function (err, response, body) {
        if(err)res.send("error");
        
        let weatherJSON = JSON.parse(body);


        res.send(weatherJSON.name);
      }); 
});

