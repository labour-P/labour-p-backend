
import Posts from "../models/posts.js";

import Rate from "../models/rate.js";
import Comments from "../models/comments.js";

import { asyncWrapper } from "../middlewares/async.js";

 //get all posts
 export const viewPosts = asyncWrapper(async (req, res) => {
    try {
     
        Posts.find((err, stats)=>{
            if(err){
                return res.send(err);
            }
           return res.json(stats);
        });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Something went wrong", error: err.message });
    }
  });
  



 //get all comments
export const viewComments = asyncWrapper(async (req, res) => {
    try {
     
        Comments.find((err, stats)=>{
            if(err){
                return res.send(err);
            }
           return res.json(stats);
        });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Something went wrong", error: err.message });
    }
  });


// make a ratting
export const rate = asyncWrapper(async (req, res) => {
  try {
      const addRating= new Rate(req.body);
      addRating.save();
    res.status(201).json({ message: "Sucessfully added a ratiing" });
  
     
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
});

// to make a post

export const createPosts = asyncWrapper(async (req, res) => {
    try {
        const addPosts= new Posts(req.body);
        addPosts.save();
      res.status(201).json({ message: "Sucessfully added your post" });
    
       
    } catch (err) {
      res
        .status(500)
        .json({ message: "Something went wrong", error: err.message });
    }
  });
 
  // to make a comment

  
export const createComments = asyncWrapper(async (req, res) => {
  const {
    userid,
thread,
location,
date,
time,
message,
imageurl,
videourl

  }= req.body
  try {
      const addComments= new Comments({userid,
        thread,
        location,
        date,
        time,
        message,
        imageurl,
        videourl
        });
      addComments.save();

      //paystack integration goes here

    res.status(201).json({ message: "Sucessfully added your created a comment" });
  
     
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
});

  

//faultfind
//this controller allows to get only data related to an id
export const faultfind = asyncWrapper(async (req, res) => {
    try {
     const query= {};
        if(req.query.status){
            query.status=req.query;
               }
        fault.findById(req.params.faultid,(err, stats)=>{
            if(err){
                return res.send(err);
            }
           return res.json(stats);
        });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Something went wrong", error: err.message });
    }
  });
  


//filtering faults
//this controller allows you to search for a fault by filtering 
export const faultfilter = asyncWrapper(async (req, res) => {
    try {
       
    const query= {};
    if(req.query.status){
        query.status=req.query.status;
    } 

  
     if(req.query.faultid){
        query.faultid=req.query.faultid;
    }

 if(req.query.userid){
        query.userid=req.query.userid;
    }

 if(req.query.department){
    query.department=req.query.department;
}
 if(req.query.technician){
    query.technician=req.query.technician;
}
 if(req.query.providers){
    query.providers=req.query.providers;
}
 if(req.query.cost){
    query.cost=req.query.cost;
}
 if(req.query.feedback){
    query.feedback=req.query.feedback;
}
 if(req.query.frequency){
    query.frequency=req.query.frequency;
} 
 if(req.query.geolocation){
    query.geolocation=req.query.geolocation;
}
    fault.find(query,(err, stats)=>{
        if(err){
            res.status(500)
            return res.send(err);
        }
        res.status(201)
       return res.json(stats);
    });   
       
    } catch (err) {
      res
        .status(500)
        .json({ message: "Something went wrong", error: err.message });
    }
  });
  
