const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config()
const connectDb = require('./config/db')
const eventRouter = require('./route/eventRoute')
const sessionRouter = require('./route/sessionRoute')

const cors = require('cors')

const PORT = process.env.PORT || 3000
connectDb()
app.use(cors())

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.set('view engine',"ejs");

app.use('/events',eventRouter)

app.use('/sessions',sessionRouter)



app.listen(PORT,()=>{
    console.log('server is running on port 3000');
    
})