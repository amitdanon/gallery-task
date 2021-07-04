const express = require('express');
const axios = require('axios');
const router = express.Router();
const FLICKR_REST_URL = "https://api.flickr.com/services/rest";

router.get('/search',async (req, res)=>{
  let {method, params} = req.query;
  params = JSON.parse(params);
  try{
    const flickrProps = {
      method,
      api_key: process.env.FLICKR_API_KEY,
      format: 'json',
      nojsoncallback: 1,
      ...params
    };
    const data = await axios.get(`${FLICKR_REST_URL}`, { params: flickrProps});
    return res.status(200).send(data.data.photos.photo);
  }catch(err){
    console.log("err",err);
    return res.status(400).send("failed to fetch data");
  }
});

module.exports = router;