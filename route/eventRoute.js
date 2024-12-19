const express = require('express')
const { createEvent, fetchEvent, fetchEventById, deleteEvent, updateEvent } = require('../controller/authController')
const Router = express.Router()


Router.post("/",createEvent)

Router.get("/",fetchEvent)

Router.get("/:id",fetchEventById)

Router.post("/:id", deleteEvent);

Router.post("/update/:id",updateEvent)

module.exports = Router