//API key and url from open weather map
const apiKey= "2826d7365afda62d28a7a9216b57af83";
const apiUrl= "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

//accessing DOM elements
const searchBox=document.querySelector(".search input");
const searchBtn=document.querySelector(".search button");
const weatherIcon=document.querySelector(".weather-icon");

//function to check weather data
async function checkWeather(city){
    //fetch weather data from open weather map API
    const response= await fetch(apiUrl+ city+ `&appid=${apiKey}`);
    
    //check for invalid city name
    if(response.status==404){
        document.querySelector(".error").classList.remove("classdisplay");
        document.querySelector(".weather").classList.add("classdisplay");
    }
    else{
        var data= await response.json();

        document.querySelector(".city").innerHTML= data.name;
        document.querySelector(".temp").innerHTML= Math.round(data.main.temp)+ "°C";
        document.querySelector(".humidity").innerHTML= data.main.humidity+ "%";
        document.querySelector(".wind").innerHTML= Math.round((data.wind.speed)*3600/1000*10)/10+ " km/h";

        //set appropriate weather icon
        if(data.weather[0].main== "Clouds"){
            weatherIcon.src= "images/clouds.png";
        }
        else if(data.weather[0].main== "Clear"){
            weatherIcon.src= "images/clear.png";
        }
        else if(data.weather[0].main== "Rain"){
            weatherIcon.src= "images/rain.png";
        }
        else if(data.weather[0].main== "Drizzle"){
            weatherIcon.src= "images/drizzle.png";
        }
        else if(data.weather[0].main== "Mist"){
            weatherIcon.src= "images/mist.png";
        }

        //display weather details and hide error message
        document.querySelector(".weather").classList.remove("classdisplay");
        document.querySelector(".error").classList.add("classdisplay");
    }
}

//add event listener for enter key event
searchBox.addEventListener("keydown", function(event){
    if(event.key=="Enter"){
        checkWeather(searchBox.value);
    }
})

//add event listener search box click event
searchBtn.addEventListener("click", function (){
    checkWeather(searchBox.value);
});