// jshint esversion:6

// getting express package to our js file.
const express = require("express");

// Body-parser is use to get the data from website input.
const bodyParser = require("body-parser");

// https is use to connect to the online api through their website or endpoint.
const https = require("https");

let app = express();

app.use(bodyParser.urlencoded({extended:true}));

//get request from client and sending html file.
app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");

});

// Post request from server to client to request the data.
app.post("/", function(req, res){
  let city = req.body.city;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=c437e6b1a0d6ab4de33006c1885f0bfc&units=metric";

  // get request from server to api through https.
  // and we will only getting data as a request.
  https.get(url, function(response){
    console.log(response.statusCode);
    //on response data milega to wahi data function main jake json.parse jo vertically arrange karega data.
    response.on("data", function(data){
     const weatherdata = JSON.parse(data); //json.parse convert hexadecimal response to readable json data
     console.log(weatherdata);
     const temp = weatherdata.main.temp;
     const weatherDescription = weatherdata.weather[0].description;
     const icon = weatherdata.weather[0].icon;
     const imageurl = "https://openweathermap.org/img/wn/"+ icon +"@2x.png";
     res.write("<p>The weather is currently "+ weatherDescription +"</p>");
     res.write("<h1>the "+city + " temperature in "+ temp +" degree celcius</h1>");
     res.write("<img src="+ imageurl +">");
     res.send();
   });
  });

});


app.listen(3000, function(){
  console.log("server is started at port 3000");
});
