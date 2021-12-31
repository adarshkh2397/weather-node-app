const getInfo = async (cityName) => {
  const response = await fetch(`/weather?address=${cityName}`);
  const data = await response.json();

  if (data.error) {
    return data.error;
  } else {
    return data.details;
  }
};

const form = document.querySelector("form");
const search = document.querySelector("#location");
const box = document.querySelector("#weather-box");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  box.innerHTML = "<p>Fetching...</p>";
  getInfo(location)
    .then((response) => {
      console.log(response);
      box.innerHTML = `<p>${response.Temperature} &deg; C</p>`;
    })
    .catch((error) => {
      console.log(error);
    });
});
