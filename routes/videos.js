const express = require("express")
const router  = express.Router();
const fs = require('fs');
const crypto = require("crypto")
 

const videosFilePath = "./data/videos.json";
function getVideos() {
    const videosDetailedArray = fs.readFileSync(videosFilePath);
    return JSON.parse(videosDetailedArray)
}

// endpoint to send array of videos
router
.route("/")
.get((_req,res)=>{
 const videos = getVideos();
 const videoArray  = videos.map(({id,title,channel,image})=>{
  return {id,title,channel,image}    
})
 res.json(videoArray)
})
.post((req,res)=>{
  const newVideo = {
    id : crypto.randomUUID(),
    title : req.body.title,
    channel : "Red Bull Bike",
    image : "http://localhost:5050/images/image9.jpg",
    description : req.body.description,
    views : "3,742,093",
    likes : "50,324",
    duration : "6:06",
    video : "https://project-2-api.herokuapp.com/stream",
    timestamp : new Date().getTime(),
    comments : []
  }
  
 const updatedVideos = getVideos();
 updatedVideos.push(newVideo);
 fs.writeFileSync(videosFilePath,JSON.stringify(updatedVideos));
 res.status(201).json(newVideo);
})



// endpoint to send  details of the video with requested id
router.get("/:id",(req,res)=>{
const requestedId = req.params.id;
const video =  getVideos().find(({id})=>{
  return id === requestedId;
})
res.json(video)
})


// endpoint for comment post request 

router.post("/:id/comments",(req,res)=>{
  const requestedId = req.params.id;
  const comment ={
    id : crypto.randomUUID(),
    name : req.body.name,
    comment : req.body.comment,
    likes : 0,
    timestamp : new Date().getTime()
  }
  const videos = getVideos();
  const selectedVideoDetails = videos.find(({id})=>{
     return id === requestedId ;
     
  })
  selectedVideoDetails.comments.push(comment);
  fs.writeFileSync(videosFilePath,JSON.stringify(videos))
  res.json(selectedVideoDetails.comments)
  })




router.delete('/:videoId/comments/:commentId',(req,res)=>{
  const params = req.params;
  const {videoId,commentId} = params;
  const videos = getVideos();
  const selectedVideo = videos.find(({id})=>{
   return  id ===  videoId;
 })
 
  const commentsArray = selectedVideo.comments.filter(({id})=>{
   return id !== commentId
  })
 selectedVideo.comments = commentsArray;
fs.writeFileSync(videosFilePath,JSON.stringify(videos))

res.send("Comment has been deleted")
})

module.exports = router;