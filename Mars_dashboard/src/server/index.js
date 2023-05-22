require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "../public")));

// example API call
app.get("/apod", async (req, res) => {
  try {
    let image = await fetch(
      `https://api.nasa.gov/planetary/apod/?api_key=${process.env.API_KEY}`
    ).then((res) => res.json());
    res.send({ image });
  } catch (err) {
    console.log("error:", err);
  }
});
// your API calls

app.get("/manifest", async (req, res) => {
  try {
    let rover = req.query.rover; // Retrieve the value of the "rover" query parameter
    let info = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}/?api_key=${process.env.API_KEY}`
    ).then((res) => res.json());
    res.send({ info }); // Send the manifest JSON data as the response
  } catch (err) {
    console.log("Error:", err);
    res.status(500).send("An error occurred."); // Return an error response to the frontend
  }
});

app.get("/photos", async (req, res) => {
  try {
    let rover = req.query.rover;
    let earth_date = req.query.earth_date; // Retrieve the value of the "rover" query parameter
    let photos = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${earth_date}&api_key=${process.env.API_KEY}`
    ).then((res) => res.json());
    res.send({ photos }); // Send the manifest JSON data as the response
  } catch (err) {
    console.log("Error:", err);
    res.status(500).send("An error occurred."); // Return an error response to the frontend
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
