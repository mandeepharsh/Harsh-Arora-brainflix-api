const express = require('express');
const router = express.Router();
const crypto = require("crypto");
const fs = require("fs")
const apiFilePath = "./data/apikey.json";


router.get("/",(_req,res)=>{
    const key =  crypto.randomUUID();
    const api_key = {
        api_key : key
    }
    const array =JSON.parse( fs.readFileSync(apiFilePath));

    array.push(api_key);
    fs.writeFileSync(apiFilePath,JSON.stringify(array))
    res.send(key);
})


module.exports = router;