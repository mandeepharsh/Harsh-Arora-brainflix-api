const express = require("express")
const router  = express.Router();
const fs = require('fs');
 

const videosFilePath = "./data/videos.json";

function getVideos() {
    const videosDetailedArray = fs.readFileSync(videosFilePath);
    return JSON.parse(videosDetailedArray)
}

// endpoint to send array of videos
router.get("/",(req,res)=>{
 const videos = getVideos();
 const videoArray  = videos.map(({id,title,channel,image})=>{
 return {id,title,channel,image}    
 })
 res.json(videoArray)
})



// endpoint to send  details of the video with requested id
router.get("/:id",(req,res)=>{
const requestedId = req.params.id;
const video =  getVideos().find(({id})=>{
  return id === requestedId;
})
res.json(video)
})






module.exports = router;