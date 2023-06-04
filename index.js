const fs = require("fs")
const express = require("express");
const cors = require("cors");
const app = express();

const videosRoutes  = require("./routes/videos");
require("dotenv").config();



const PORT = process.env.PORT || 8080 ;

app.use(cors());
app.use(express.json())
app.use(express.static("public"));

app.use("/videos",videosRoutes)



app.listen(PORT , () => {
    console.log(`Server is running on http://localhost:${PORT} `)
})