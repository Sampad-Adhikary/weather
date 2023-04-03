const express = require("express");
const https = require("https");
const body = require("body-parser");
const app = express();

app.set("view engine","ejs");
app.use(body.urlencoded({extended: true}));
app.use(express.static("public"));

var weatherData;
let temp;
var description;
var icon
var iurl;
var query;

app.get("/",(req,res)=>{
    res.render('index',{cityName:query,temperature:temp,weatherDescription:description,weatherIcon:iurl});
})

app.get("/error",(req,res)=>{
    res.send("Location Not Found!!")
})

app.post("/",(req,res)=>{
    query = req.body.cityName;
    var url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=5d2cfe6d30748f1f07f9352ed612d3bb&units=metric";
    https.get(url,function(response){
    response.on("data",(data)=>{
        weatherData = JSON.parse(data)
        if(weatherData.code != 200){
            res.redirect("/error");
        }
        temp = weatherData.main.temp;
        description = weatherData.weather[0].description;
        icon = weatherData.weather[0].icon;
        iurl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
        res.redirect("/");
    })
    })
})

app.get("/",(req,res)=>{
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=5d2cfe6d30748f1f07f9352ed612d3bb&units=metric";
    https.get(url,(response)=>{
        res.render('index',{cityName:query,temperature:temp,weatherDescription:description,weatherIcon:iurl});
    });
    console.log(iurl)
})

app.listen(3000,(req,res)=>{
    console.log("server started at port: 3000");
}) 