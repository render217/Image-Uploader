require('dotenv').config();
const express = require('express')
// const connectDB = require('./src/config/database')
const imageRoute = require('./src/api')

const app = express();


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/',(req,res)=>{
    res.send('server is running')
})
app.use('/api/v1/images',imageRoute)


const PORT = process.env.PORT || 3000;
app.listen(PORT,async (req,res)=>{
    // await connectDB();
    console.log(`server running on ${PORT}`)
})