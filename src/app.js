const express = require("express")
const path = require("path")
const hbs = require("hbs")
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const request = require('postman-request')



const app = express()

const staticFolderPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(staticFolderPath))

app.get("", (req, res) => {
  res.render("index", {
    name: "Doga",
    age: "25",
  })
})

app.get("/help", (req, res) => {
  res.render("help", {
    name: "Doga",
    age: "25",
  })
})

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You cannot make a request without address parameter",
    })
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error })
    }
    
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error: error
        })
      }
      res.send({
        address: req.query.address,
        forecast: forecastData,
        location: location
      })
    })
  })
})

app.get("/about", (req, res) => {
  res.render("about", {
    name: "Doga",
    age: "25",
  })
})

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help page Not found",
  })
})

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page Not found",
  })
})

app.listen(3000, () => {
  console.log("Server is running on port 3000")
})
