require('dotenv').config();
const express = require('express')
// const connectDB = require('./src/config/database')
const imageRoute = require('./src/api')
const cors = require('cors')
const app = express();


app.use(cors())
app.use('/',(req,res)=>{
    res.send('server is running')
})
app.use('/api/v1/images',imageRoute)


const PORT = process.env.PORT || 3000;
app.listen(PORT,async (req,res)=>{
    // await connectDB();
    console.log(`server running on ${PORT}`)
})