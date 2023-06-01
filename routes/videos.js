const express = require("express")
const router  = express.Router();
const fs = require('fs');
 

const videosFilePath = "./data/videos.json";

function getVideos() {
    const videosDetailedArray = fs.readFileSync(videosFilePath);
    return JSON.parse(videosDetailedArray), console.log(JSON.parse(videosDetailedArray))

}


router.get("/",(req,res)=>{
      const videos = getVideos();
   const  videoList = videos.map((video)=>{
     {{video.id,video.title,video.channel}}
   })
console.log(videoList,"it is a string")
    res.send(videos) 
   
})

module.exports = router;