import React, { use, useEffect ,useState,useRef } from 'react'
import './Weather.css'
import searchIcon from '../assets/search.png'
import clearIcon from '../assets/clear.png'
import cloudIcon from '../assets/cloud.png'
import drizzleIcon from '../assets/drizzle.png'
import humidityIcon from '../assets/humidity.png'
import rainIcon from '../assets/rain.png'
import snowIcon from '../assets/snow.png'
import windIcon from '../assets/wind.png'
import mistIcon from '../assets/mist1.png'
import thunderstormIcon from '../assets/thunderstorm.png'

const Weather = () => {

  const inputRef= useRef();
const [weatherData, setWeatherData] = useState(false);

const allIcons={
    "01d":clearIcon,
    "01n":clearIcon,  
    "02d":cloudIcon,
    "02n":cloudIcon,
    "03d":cloudIcon,
    "03n":cloudIcon,
    "04d":drizzleIcon,
    "04n":drizzleIcon,
    "09d":drizzleIcon,
    "09n":drizzleIcon,
    "10d":rainIcon,
    "10n":rainIcon,
    "11d":thunderstormIcon,
    "11n":thunderstormIcon,
    "13d":snowIcon,
    "13n":snowIcon,
    "50d":mistIcon,
    "50n":mistIcon,
}

const search = async (city) => {
   if(!city){ alert("Please enter a city name")
   return;
  }
    try{
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}&units=metric`;
    const res= await fetch(url);
    const data= await res.json();
    if (!res.ok){alert("City not found"); return;}
    console.log(data);
    const icon = data.weather[0].icon || "01d";
    setWeatherData({
        discription:data.weather[0].main,
        humidity:data.main.humidity,
        windSpeed:data.wind.speed,
        temprature:Math.floor(data.main.temp),
        location:data.name,
        icon:allIcons[icon]
    });
    // Clear input after successful search
    if (inputRef.current) inputRef.current.value = "";
    }catch(error){
      console.log("Error in fetching weather data", error);
    }
}

useEffect(() => {search("delhi")}, []);

  // Handler for Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search(inputRef.current.value);
    }
  };

  return (
    <div className="weather">
                <div className="weather-bubbles" id="bubbles"><div className="bubble" style={{width: "66px", height: "66px", left: "22%", top: "76%", animationDuration: "9s", animationDelay: "4s"}}></div><div className="bubble" style={{width: "58px", height: "58px", left: "71%", top: "8%", animationDuration: "11s", animationDelay: "3s"}}></div><div className="bubble" style={{width: "47px", height: "47px", left: "91%", top: "64%", animationDuration: "6s", animationDelay: "1s"}}></div><div className="bubble" style={{width: "75px", height: "75px", left: "22%", top: "7%", animationDuration: "6s", animationDelay: "2s"}}></div><div className="bubble" style={{width: "79px", height: "79px", left: "18%", top: "91%", animationDuration: "8s", animationDelay: "1s"}}></div><div className="bubble" style={{width: "56px", height: "56px", left:"33%", top:"40%", animationDuration:"7s", animationDelay:"3s"}}></div><div className="bubble" style={{width:"22px", height:"22px", left:"44%", top:"92%", animationDuration:"11s", animationDelay:"1s"}}></div><div className="bubble" style={{width:"46px", height:"46px", left:"18%", top:"28%", animationDuration:"6s", animationDelay:"3s"}}></div></div>

      <div className="search-bar">
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter city name"
          onKeyDown={handleKeyDown}
        />
        <img src={searchIcon} alt="Search" onClick={() => search(inputRef.current.value)} />
      </div>
{weatherData?<>
    <img src={weatherData?.icon} alt="" className="weather-icon" />
    <p className='description'>{weatherData?.discription}</p>
    <p className='temperature'>{weatherData?.temprature}°C</p>
    <p className='location'>{weatherData?.location}</p>
    <div className="weather-data">
        <div className="col">
           <img src={humidityIcon} alt="humidity" />
           <div>
            <p>{weatherData?.humidity}%</p>
            <span>Humidity</span>
           </div>
        </div>
                <div className="col">
           <img src={windIcon} alt="wind" />
           <div>
            <p>{weatherData?.windSpeed} km/h</p>
            <span>Wind Speed</span>
           </div>
        </div>
    </div>
</>:<></>}
    </div>
  );
};

export default Weather