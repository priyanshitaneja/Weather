const express= require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app= express();
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/", function(req, res){
	// res.send("ABCD....XYZ");
	
	res.sendFile(__dirname+ "/index.html");

	
});

app.post("/", function(req, res) {
	

	const city= req.body.cityName;
	const unit= "metric";
	const apiKey = "b0aea90081b399dc52bff96297b27af5"

	const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" + unit + "&appid=" + apiKey;
	https.get(url, function(response){
		
		console.log(response.statusCode);

		response.on("data", function(data){
			const weatherData = JSON.parse(data);
			console.log(weatherData);
			const temp = weatherData.main.temp;
			// console.log(temp);
			const desc = weatherData.weather[0].description;
			// console.log(desc);
			const icon = weatherData.weather[0].icon;
			const imageUrl = "http://openweathermap.org/img/wn/" + icon +"@2x.png";

			res.write("<h1>The temperature in " + city + " is " + temp + " degree Celcius.</h1>");
			res.write("<p> The weather is currently " + desc + "</p>");
			res.write("<img src=" + imageUrl + " >");
			res.send();
			
		});
	});
	
});

app.listen(3000, function(){
	console.log("Server running at port 3000");
});