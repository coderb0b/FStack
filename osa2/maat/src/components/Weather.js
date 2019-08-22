import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
	const [ weather, setWeather ] = useState('')

	const weatherHook = () => {
		axios
		  .get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&APPID=4a07eace1a3e10798cefef1b040f2479`)
		  .then(response => {
			setWeather(response.data)
		  })
	 }
	 useEffect(weatherHook, []) 

	if (!weather) {
		return(
		<></>
		)
	}
	
	return (
      <div>
		<h3>temperature: {Math.round(weather.main.temp - 273.15)} celsius</h3>
		<h3>clouds: {weather.clouds.all} %</h3>
		<h3>wind: {weather.wind.speed} m/s direction {weather.wind.deg} degrees</h3>
      </div>
    )
}

export default Weather