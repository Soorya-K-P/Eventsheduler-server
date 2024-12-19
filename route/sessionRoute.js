const express = require('express')
const { createsession, fetchsession, fetchsessionByeventId, deletesession, updatesession } = require('../controller/sessionController')
const Router = express.Router()

Router.post("/",createsession)

Router.get("/",fetchsession)

Router.get("/session/:id", fetchsessionByeventId)

Router.post("/:id", deletesession)

Router.post("/update/:id",updatesession)


module.exports = Router