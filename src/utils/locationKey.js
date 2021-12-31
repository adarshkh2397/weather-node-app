const axios = require("axios");

const apiKey = "NSeAisdzsu7wjvlxTGGmHOinwAeDlDcw ";

const getLocationKey = async (cityName) => {
  const locationUrl = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${cityName}`;
  const response = await axios(locationUrl);
  if (response.status !== 200) {
    throw new Error("Unable to connect to dataservice of getLocationKey");
  }

  const data = response.data;
  if (data.length === 0) {
    throw new Error("No cities found");
  }
  return data[0];
};

module.exports = getLocationKey;
