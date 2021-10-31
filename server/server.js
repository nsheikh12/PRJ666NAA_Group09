require('dotenv').config({ path: './config/keys.env' });

const express = require('express')
const app = express()
const cookieParser = require('cookie-parser'); //added by Isabella, for cookies
const passport = require('passport')

const mongoose = require('mongoose')
var cors = require('cors')

var port_number = app.listen(process.env.PORT || 5000);

mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))
app.use(express.json())
app.use(cookieParser()); // newly added
app.use(passport.initialize());


app.use(cors())

const usersRouter = require('./controllers/userController')
const reportIssueRouter = require('./controllers/reportIssueController')
const hardwareRouter = require('./controllers/hardwareController')
const articleRouter = require('./controllers/articleController')
const requestServiceRouter = require('./controllers/requestServiceController')

app.use('/users', usersRouter)
app.use('/reportIssue', reportIssueRouter)
app.use('/hardware', hardwareRouter)
app.use('/articles', articleRouter)
app.use('/requestService', requestServiceRouter)


app.listen(port_number, () => console.log('Server running...'))