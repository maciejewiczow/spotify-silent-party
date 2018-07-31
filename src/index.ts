import express = require("express")
import bodyParser = require("body-parser")
import compression = require("compression")
import helmet = require("helmet")
import dotenv = require("dotenv")

dotenv.config()
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(helmet())
app.use(compression())

// app.use('/', router)

export default app
