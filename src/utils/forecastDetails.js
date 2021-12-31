const axios = require("axios");

const apiKey = "NSeAisdzsu7wjvlxTGGmHOinwAeDlDcw";

const getForecastDetails = async (key) => {
  const forecastUrl = `http://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=${apiKey}`;
  const response = await axios(forecastUrl);
  if (response.status !== 200) {
    throw new Error("Unable to connect to dataservice of getForecastDetails");
  }
  const data = response.data;
  if (data.length === 0) {
    throw new Error("No cities found");
  }
  return data[0];
};

module.exports = getForecastDetails;
