const express = require('express')
const app = express()
const dotenv = require ('dotenv').config()
const colors = require('colors')
const {errorHandler} = require('./middlewares/errorMiddleware.js')
const port = process.env.PORT || 5000
const connectDB = require('./config/db.js')

connectDB()


app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use('/api/goals',  require('./routes/goalrouter.js'))
app.use('/api/users',  require('./routes/userRoutes.js'))

app.use(errorHandler)

app.listen(port,()=>{
    console.log(`Server runing at port http://localhost:${port}`)
    // console.log(`Server runing at port ${port}`)
})