const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

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
    name: "John Jeong",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "John Jeong",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "John Jeong",
  });
});

app.get("/weather", (req, res) => {
  const location = req.query.location;

  geocode(location)
    .then((geoInfo) =>
      forecast(geoInfo).then((forecastInfo) => res.send(forecastInfo))
    )
    .catch((error) => res.send({ error: `Insufficient location` }));
});

app.get("/404", (req, res) => {
  res.render("404");
});

app.get("*", (req, res) => {
  res.redirect("/404");
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
