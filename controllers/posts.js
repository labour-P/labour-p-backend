
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
      const  Comments = await  Comments.findOne({ thread: req.body.thread });

        Comments.find((err, stats)=>{
            if (!Comments){
              res
              .status(500)
              .json({ message: "No Comments found" });
            }
           return res.json(Comments);
        });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Something went wrong", error: err.message });
    }
  });


  //view rating
  export const viewRate = asyncWrapper(async (req, res) => {
    try {
      const  Rate = await  Rate.findOne({ thread: req.body.thread });

        Comments.find((err, stats)=>{
            if (!Comments){
              res
              .status(500)
              .json({ message: "No Comments found" });
            }
           return res.json(Comments);
        });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Something went wrong", error: err.message });
    }
  });



// make a ratting
export const createRate = asyncWrapper(async (req, res) => {
  try {
      const addRating= new Rate(req.body);
      addRating.save();
    res.status(201).json({ message: "Sucessfully liked a post" });
  
     
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
    username,
    name,
    profileUrl,
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
        userid,
    username,
    name,
    profileUrl,
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

    res.status(201).json({ message: "Sucessfully  created a comment" });
  
     
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
});

  
