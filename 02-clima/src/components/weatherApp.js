import { useEffect, useState } from 'react'
import WeatherForm from './weatherForm'
import WeatherMainInfo from './weatherMainInfo'
import Loading from './loading'
import styles from './weatherApp.module.css'

export default function WeatherApp() {
  const [weather, setWeather] = useState(null)

  //console.log(styles)

  useEffect(() => {
    loadInfo()
  }, [])

  useEffect(() => {
    document.title = `Weather | ${weather?.location.name ?? ''}`
  }, [weather])

  async function loadInfo(city = 'london') {
    try {
      const uri = `${process.env.REACT_APP_URL}&key=${process.env.REACT_APP_KEY}&q=${city}`
      const request = await fetch(uri)
      const jsonResponse = await request.json()

      // console.log(uri)
      // console.log(jsonResponse)
      setTimeout(() => {
        setWeather(jsonResponse)
      }, 2000)
    } catch (error) {}
  }

  function handleChangeCity(city) {
    setWeather(null)
    loadInfo(city)
  }

  return (
    <div className={styles.weatherContainer}>
      <WeatherForm onChangeCity={handleChangeCity} />
      {weather ? <WeatherMainInfo weather={weather} /> : <Loading />}
    </div>
  )
}
