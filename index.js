const express = require("express");
const app = express();
const videosRoutes  = require("./routes/videos");
const registerRoutes = require("./routes/register");
const fs = require("fs")
const cors = require("cors");
require("dotenv").config();



const PORT = process.env.PORT || 5050;

app.use(express.static("public"));
app.use(express.json())
app.use(cors());
app.use("/register",registerRoutes)

app.use((req,res,next)=> {
    const api_keys =JSON.parse( fs.readFileSync("./data/apikey.json"));
    const keyFound = api_keys.find((key)=>
    key.api_key ===  req.query.api_key
  )
    if(!!keyFound){
        return  next()
    }else if(!keyFound) {
      return   res.status(403).json({
            error : "API require api_key query string"
        })
    }

    return res.status(401).json({
        error : "invalid api key"
    })
})


app.use("/videos",videosRoutes)



app.listen(PORT , () => {
    console.log(`Server is running on http://localhost:${PORT} `)
})