require('dotenv').config();
const express = require('express')
// const connectDB = require('./src/config/database')
const imageRoute = require('./src/api')
const cors = require('cors')
const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST");
    next();
  });

app.use('/api',imageRoute)


const PORT = process.env.PORT || 3000;
app.listen(PORT,async (req,res)=>{
    // await connectDB();
    console.log(`server running on ${PORT}`)
})