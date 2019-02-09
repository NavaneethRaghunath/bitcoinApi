// jshint esversion : 6

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");

app.use(bodyParser.urlencoded({extended : true}));

app.listen(3000,()=>{
  console.log("Server started");
});

app.get("/",(req,res)=>{
  res.sendFile(__dirname + "/index.html");
});

app.post("/",(req,res)=>{
  // console.log(req.body.fiat);

  var digitalCurrency = req.body.bitcoin;
  var physicalCurrency = req.body.fiat;
  var count = req.body.amount;
//  var context = digitalCurrency  + physicalCurrency;
//  var url = "https://apiv2.bitcoinaverage.com/indices/global/ticker/" + context;

  var option = {
    url : "https://apiv2.bitcoinaverage.com/convert/global?",
    method : "GET",
    qs : {
      from : digitalCurrency,
      to : physicalCurrency,
      amount : count
    }
  };

  request(option,(error,response,body)=>{
      var data = JSON.parse(body);
      var price = data.price;
      var date = data.time;

      res.write("<h1>The conversion on " +date+ "</h1>");
      res.write("<h1>The price of "+count+" " +digitalCurrency+ " is " +price+ " " +physicalCurrency+ ".</h1>");
      res.send();

// To send multiple data use res.write and then res.send
  });
});
