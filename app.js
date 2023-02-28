const express = require("express");
const https = require("https");
const body = require("body-parser");
const app = express();
app.use(body.urlencoded({extended: true}));
app.get("/",(req,res)=>{
    const query = "Jalandhar";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=5d2cfe6d30748f1f07f9352ed612d3bb&units=metric";
    https.get(url,(response)=>{
        res.sendFile(__dirname+"/index.html")
    });

})

app.post("/",(req,res)=>{
    const query = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=5d2cfe6d30748f1f07f9352ed612d3bb&units=metric";
    https.get(url,function(response){
    response.on("data",(data)=>{
        console.log(data);
        const weatherData = JSON.parse(data)
        const temp = weatherData.main.temp;
        console.log(temp);
        const maxTemp = weatherData.main.temp_max;
        console.log(maxTemp);
        const dedscription = weatherData.weather[0].description;
        console.log(dedscription);
        const icon = weatherData.weather[0].icon;
        const url = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
        res.write("<p>The weather is currently "+dedscription+ "</p>");
        res.write("<h1>Current temperature in "+query +" is: "+temp+" degree celcius</h1>");
        res.write("<img src="+url+"></img>");
        res.send();
    })
    })
})

app.listen(3000,(req,res)=>{
    console.log("server started at port: 3000");
}) 