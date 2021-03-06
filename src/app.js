const path = require("path");
const express = require("express");
const hbs = require("hbs");
const getDetails = require("./utils/main");

const app = express();
const PORT = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Adarsh",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Adarsh",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "Adarsh",
  });
});

app.get("/weather", async (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must enter address",
    });
  }
  try {
    const details = await getDetails(req.query.address);
    res.send({
      address: req.query.address,
      details,
    });
  } catch (error) {
    res.send({
      address: req.query.address,
      error: error.message,
    });
  }
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Adarsh",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Adarsh",
    errorMessage: "Page not found.",
  });
});

app.listen(PORT, () => {
  console.log("Server is up on port " + PORT);
});
