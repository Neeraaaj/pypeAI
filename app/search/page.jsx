'use client'

import React, {useState, useEffect}from 'react'
import axios from 'axios';

const page = () => {
    const [location, setLocation] = useState('');
    const [weatherData, setWeatherData] = useState(null);

      const fetchData = async () => {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=baf5dc7e042c4c63446e168831b61351`
          );
          setWeatherData(response.data);
          setLocation("");
        } catch (error) {
          console.error('Error fetching weather data:', error.message);
        }
      };

      console.log(weatherData)
      const currentDate = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = currentDate.toLocaleDateString('en-US', options);

      const formattedTemp = weatherData?.main.temp - 273.15;

      const currentTime = new Date().getTime() / 1000;

    const sunriseTime = weatherData?.sys.sunrise;
    const sunsetTime = weatherData?.sys.sunset;

    const isDaytime = currentTime > sunriseTime && currentTime < sunsetTime;
  
    return (
      <div>
        <div className='flex flex-row w-[50vw] absolute mx-[25%] m-5'>
            <input className='bg-white text-black rounded-md w-full p-3' onChange={(e) => setLocation(e.target.value)} />
            <button className='bg-green-400 p-3 text-white m-2 rounded-md' onClick={() => fetchData()}>Search</button>
        </div>

        {weatherData && (
<div className="min-h-screen flex items-center justify-center">
<div className="flex flex-col bg-white rounded p-4 w-full max-w-xs">
						<div className="font-bold text-xl">{weatherData?.name}</div>
						<div className="text-sm text-gray-500">{formattedDate}</div>
						<div className="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
                            {isDaytime ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="yellow" className="bi bi-cloud-sun-fill w-[45px] h-[45px] bg-white" viewBox="0 0 16 16"> <path d="M11.473 11a4.5 4.5 0 0 0-8.72-.99A3 3 0 0 0 3 16h8.5a2.5 2.5 0 0 0 0-5h-.027z"/> <path d="M10.5 1.5a.5.5 0 0 0-1 0v1a.5.5 0 0 0 1 0v-1zm3.743 1.964a.5.5 0 1 0-.707-.707l-.708.707a.5.5 0 0 0 .708.708l.707-.708zm-7.779-.707a.5.5 0 0 0-.707.707l.707.708a.5.5 0 1 0 .708-.708l-.708-.707zm1.734 3.374a2 2 0 1 1 3.296 2.198c.199.281.372.582.516.898a3 3 0 1 0-4.84-3.225c.352.011.696.055 1.028.129zm4.484 4.074c.6.215 1.125.59 1.522 1.072a.5.5 0 0 0 .039-.742l-.707-.707a.5.5 0 0 0-.854.377zM14.5 6.5a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/> </svg> : 
                            <svg xmlns="http://www.w3.org/2000/svg w-[45px] h-[45px] bg-black" width="16" height="16" fill="white" className="bi bi-cloud-moon-fill" viewBox="0 0 16 16"> <path d="M11.473 11a4.5 4.5 0 0 0-8.72-.99A3 3 0 0 0 3 16h8.5a2.5 2.5 0 0 0 0-5h-.027z"/> <path d="M11.286 1.778a.5.5 0 0 0-.565-.755 4.595 4.595 0 0 0-3.18 5.003 5.46 5.46 0 0 1 1.055.209A3.603 3.603 0 0 1 9.83 2.617a4.593 4.593 0 0 0 4.31 5.744 3.576 3.576 0 0 1-2.241.634c.162.317.295.652.394 1a4.59 4.59 0 0 0 3.624-2.04.5.5 0 0 0-.565-.755 3.593 3.593 0 0 1-4.065-5.422z"/> </svg>}
						</div>
						<div className="flex flex-row items-center justify-center mt-6">
							<div className="font-extrabold text-6xl text-black">{formattedTemp.toFixed(0)}</div>
							<div className="flex flex-col items-center ml-6">
								<div className='text-black'>Cloudy</div>
								<div className="mt-1">
									<span className="text-sm"><i className="far fa-long-arrow-up"></i></span>
									<span className="text-sm font-light text-gray-500">28°C</span>
								</div>
								<div>
									<span className="text-sm"><i className="far fa-long-arrow-down"></i></span>
									<span className="text-sm font-light text-gray-500">20°C</span>
								</div>
							</div>
						</div>
						<div className="flex flex-row justify-between mt-6">
							<div className="flex flex-col items-center">
								<div className="font-medium text-sm text-black">Wind</div>
								<div className="text-sm text-gray-500">{weatherData?.wind.speed}</div>
							</div>
							<div className="flex flex-col items-center">
								<div className="font-medium text-sm text-black">Humidity</div>
								<div className="text-sm text-gray-500">{weatherData?.main.humidity} ℃</div>
							</div>
							<div className="flex flex-col items-center">
								<div className="font-medium text-sm text-black">Visibility</div>
								<div className="text-sm text-gray-500">{weatherData?.visibility}M</div>
							</div>
						</div>
					</div>
</div>
        )}
      </div>
    );
};

export default page