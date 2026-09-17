const request = require("postman-request");

function getWeather(geoData, callback) {
  const WEATHERSTACK_KEY = process.env.WEATHERSTACK_API_KEY;

  if (!WEATHERSTACK_KEY) {
    return callback("Missing WEATHERSTACK_API_KEY in .env file!", undefined);
  }

  const weatherUrl =
    "https://api.weatherstack.com/current?access_key=" +
    WEATHERSTACK_KEY +
    "&query=" +
    geoData.latitude +
    "," +
    geoData.longitude;

  request({ url: weatherUrl, json: true }, (error, response) => {
    // 1. Handle low-level connection failure
    if (error) {
      return callback("Unable to connect to weather service!", undefined);
    }

    // 2. Handle API errors returned in body (with return!)
    if (response.body.error) {
      return callback(
        "Weather API error: " + response.body.error.info,
        undefined,
      );
    }

    // 3. Handle success
    const current = response.body.current;
    const message =
      "\n" +
      current.weather_descriptions[0] +
      ".\n It is currently " +
      current.temperature +
      " degrees out. It feels like " +
      current.feelslike +
      " degrees out.\nwind speed is " +
      current.wind_speed +
      " km/hr.";

    callback(undefined, message);
  });
}

module.exports = getWeather;
