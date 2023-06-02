const express = require("express");
const app = express();
const videosRoutes  = require("./routes/videos");
const fs = require("fs")
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 5050;

app.use(express.static("public"));
app.use(cors());
app.use(express.json())

// app.use((res,req,next)=> {

//     if (req.query.apiKey === process.env.API_key){
//         return  next()
//     }else if (!req.query.apiKey){
//         res.status(403).json({
//             error : "API require api_key query string"
//         })
//     }

//     res.status(401).json({
//         error : "invalid api key"
//     })
// })

app.use("/videos",videosRoutes)



app.listen(5050 , () => {
    console.log("server is running ")
})