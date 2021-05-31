const axios = require("axios");

const geocode = (location = "") =>
  axios
    .get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoiYm90c2Zvcm1lIiwiYSI6ImNrbXU4bXptbTBrZ3cydnBjbWc2MXMxZ2UifQ.XcX5TX9LIP4N_eGqNcs0kg&limit=1`
    )
    .then((response) => {
      const placeName = response.data.features[0].place_name;
      const coordinate = response.data.features[0].center;
      return {
        placeName: placeName,
        coordinate: coordinate,
        error: undefined,
      };
    })
    .catch((error) => {
      return {
        placeName: undefined,
        coordinate: undefined,
        error: "Insufficient location information",
      };
    });

module.exports = geocode;
