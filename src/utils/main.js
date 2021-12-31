const getLocationKey = require("./locationKey.js");
const getForecastDetails = require("./forecastDetails.js");

const getDetails = async (city) => {
  const cityDetails = await getLocationKey(city);
  const weather = await getForecastDetails(cityDetails.Key);

  const isPincode = !isNaN(city);
  let cityName = "";
  if (isPincode) {
    cityName = cityDetails.SupplementalAdminAreas[0].EnglishName;
  } else {
    cityName = cityDetails.EnglishName;
  }

  const details = {
    Temperature: weather.Temperature.Metric.Value,
    CurrentCondition: weather.WeatherText,
    HasChancesOfRain: weather.HasPrecipitation,
    PrecipitationType: weather.PrecipitationType,
    CityName: cityName,
    State: cityDetails.AdministrativeArea.EnglishName,
    Country: cityDetails.Country.EnglishName,
  };
  return details;
};

module.exports = getDetails;
