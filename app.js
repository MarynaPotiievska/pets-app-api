const express = require('express')
const logger = require('morgan')
const cors = require('cors')


const authRouter = require('./routes/api/auth')
const noticesRouter = require("./routes/api/notices")
const petsRouter = require('./routes/api/pets')
const userRouter = require('./routes/api/user')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/notices', noticesRouter)
app.use('/api/pets', petsRouter)
app.use('/api/user', userRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
})

module.exports = app
