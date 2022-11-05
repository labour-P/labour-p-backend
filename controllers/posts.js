
import Postsmo from "../models/posts.js";

import Rate from "../models/rate.js";
import Comments from "../models/comments.js";

import { asyncWrapper } from "../middlewares/async.js";


import uploader from "../middlewares/multer.js";


import cloudinary from "../middlewares/cloudinary.js";
import posts from "../models/posts.js";





// app.post("/upload", uploader.single("file"), async (req, res) => {
//   const upload = await cloudinary.v2.uploader.upload(req.file.path);
//   return res.json({
//     success: true,
//     file: upload.secure_url,
//   });
// });


export const fileuploader = asyncWrapper(uploader.single("file"), async (req, res) => {
  try {
   
    const upload = await cloudinary.v2.uploader.upload(req.file.path);
    return res.json({
      success: true,
      file: upload.secure_url,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: err });
  }
});



 //get all posts
 export const viewPosts = asyncWrapper(async (req, res) => {
  const {page}= req.body;
    try {
      const Limit = 5;
      const Index= (Number(page)-1)*Limit;

      // const total= await Postsmo.countDocuments({});
       const model= await Postsmo.find().sort({_id:-1}).limit(Limit).skip(Index);

        res.json({
          data: model,
          currentpage: Number(page),
          // numberOfPages: Math.cell(total/Limit),
        });
        
    } catch (err) {
      res
        .status(500)
        .json({ message: "Something went wrong", error: err.message });
    }
  });
  
  export const findPosts = asyncWrapper(async (req, res) => {
    const {id}= req.body;
      try {
       
        // const total= await Postsmo.countDocuments({});
         const model= await Postsmo.find({_id:id});
  
          res.json({
            data: model,
           
            // numberOfPages: Math.cell(total/Limit),
          });
          
      } catch (err) {
        res
          .status(500)
          .json({ message: "Something went wrong", error: err.message });
      }
    });
    
    export const findUserPosts = asyncWrapper(async (req, res) => {
      const {userid}= req.body;
        try {
         
          // const total= await Postsmo.countDocuments({});
           const model= await Postsmo.find({_id:id});
    
            res.json({
              data: model,
             
              // numberOfPages: Math.cell(total/Limit),
            });
            
        } catch (err) {
          res
            .status(500)
            .json({ message: "Something went wrong", error: err.message });
        }
      });


 //get all comments
export const viewComments = asyncWrapper(async (req, res) => {
  const {
    thread}= req.body

    try {
      Comments.find({ thread: thread }, function (err, response) {
        if(!response){
          return res
          .status(400)
          .json({ message: "no comments found", error: err.message });
        }

        return res.json(response);

      });

      
       
    } catch (err) {
      res
        .status(500)
        .json({ message: "Something went wrong", error: err.message });
    }
  });


  //view rating
  export const viewRate = asyncWrapper(async (req, res) => {
    const {
       thread}= req.body
  
      try {
        Rate.find({ thread: thread }, function (err, response) {
          if(!response){
            return res
            .status(400)
            .json({ message: "no comments found", error: err.message });
          }
          return res.json(response);
  
        });
  
    } catch (err) {
      res
        .status(500)
        .json({ message: "Something went wrong", error: err.message });
    }
  });



// make a ratting
export const createRate = asyncWrapper(async (req, res) => {
  const {
    userid,
    username,
    name,
    profileUrl,
    thread,
    location,
    date,
    time
  }= req.body
  try {

    const usernameexist = await Rate.findOne({ username: username });
      if (usernameexist ){
        
        const deleted = await Rate.findByIdAndDelete({ _id: usernameexist._id });
        const all= await Rate.find({thread: thread});
        const updated = await Postsmo.findOneAndUpdate({ thread: usernameexist.thread, rate: Object.keys(all).length});



        return res.status(200).json({ message: "You have unliked this post", response: usernameexist, count: Object.keys(all).length  });
      }else{
        const addRate=new Rate({
          userid,
          username,
          name,
          profileUrl,
          thread,
          location,
          date,
          time
          });
          await addRate.save();
          const all= await Rate.find({thread:thread});

          const updated = await Postsmo.findOneAndUpdate({ thread: thread, rate: Object.keys(all).length});
  
        res
          .status(200)
          .json({ message: "You have liked this post", response: addRate, count: Object.keys(all).length });
        }
   
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
});

// to make a post

export const createPosts = asyncWrapper(async (req, res) => {
    try {
        const addPosts= new Postsmo(req.body);
        addPosts.save();
      res.status(201).json({ data: addPosts, message: "Sucessfully added your post" });      
    } catch (err) {
      res
        .status(500)
        .json({ message: "Something went wrong", error: err.message , data: addPosts });
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
      const addComments= new Comments({
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
      // const all= await Comments.find({thread: thread});
      // const updated = await Postsmo.findOneAndUpdate({ thread: thread, comment: Object.keys(all).length});

      

    res.status(201).json({ message: "Sucessfully  created a comment", data : addComments, message: "Sucessfully  created a comment" });
  
     
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
});


 

export const Count  = asyncWrapper(async (req, res) => {
  const {
  
thread }= req.body
  try {
      
      const all= await Comments.find({thread: thread});
      // const updated = await Postsmo.findOneAndUpdate({ thread: thread, comment: Object.keys(all).length});

      const all2= await Rate.find({thread: thread});


    res.status(201).json({ msg: "Sucessfully fectched",thread: thread, countComment: Object.keys(all).length , countRate: Object.keys(all2).length });
  
     
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
});


export const noComments = asyncWrapper(async (req, res) => {
  const {
  
thread }= req.body
  try {
      
      const all= await Comments.find({thread: thread});
      // const updated = await Postsmo.findOneAndUpdate({ thread: thread, comment: Object.keys(all).length});

      

    res.status(201).json({ message: "Sucessfully fectched number of comments ",thread: thread, count: Object.keys(all).length });
  
     
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
});


export const noRate = asyncWrapper(async (req, res) => {
  const {
  
thread }= req.body
  try {
      
      const all= await Rate.find({thread: thread});

      

    res.status(201).json({ message: "Sucessfully fectched number of rate ", thread: thread, count: Object.keys(all).length });
  
     
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
});

 