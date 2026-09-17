const path = require("path");
const express = require("express");
const hbs = require("hbs");

require("dotenv").config();

const getCoordsNeshan = require("./neshan");
const getWeather = require("./weather");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicPath));

app.get("", (req, res) => {
  res.render("index", { title: "Weather App", name: "Mohammad mahdi" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About Me", name: "Mohammad mahdi" });
});

app.get("/help", (req, res) => {
  res.render("help", { title: "Help", name: "Mohammad mahdi" });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Declare the address!" });
  }
  getCoordsNeshan(req.query.address, (geoError, geoData) => {
    if (geoError) {
      return console.log("Geocoding Error:", geoError);
    }

    getWeather(geoData, (weatherError, message) => {
      if (weatherError) {
        return console.log("Weather Error:", weatherError);
      }
      res.send({
        location: req.query.address,
        forecast: message,
        coordinates: geoData,
      });
    });
  });
});

app.get("/help/{*splat}", (req, res) => {
  res.render("notfound", {
    title: "NotFound 404 Page",
    name: "Mohammad mahdi",
    errMessage: "Help article not found",
  });
});

app.get("/{*splat}", (req, res) => {
  res.render("notfound", {
    title: "NotFound 404 Page",
    name: "Mohammad mahdi",
    errMessage: "Page not found",
  });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`server is up and running on port ${port}`);
});
