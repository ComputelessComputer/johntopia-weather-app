const axios = require("axios");

const weatherUrl =
  "http://api.weatherstack.com/current?access_key=5d34980d6caacd3aa7ebd0ea167781e3&query=";

const forecast = (geoInfo) =>
  axios
    .get(weatherUrl + geoInfo.coordinate[1] + "," + geoInfo.coordinate[0])
    .then((response) => {
      const temp = response.data.current.temperature;
      const weather = response.data.current.weather_descriptions.join(" & ");
      return {
        placeName: geoInfo.placeName,
        weather: temp + " Degrees Celcius, " + weather,
        error: undefined,
      };
    })
    .catch((error) => {
      return {
        placeName: undefined,
        weather: undefined,
        error: "Error: Insufficient location information",
      };
    });

module.exports = forecast;
