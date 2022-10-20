
import adminPosts from "../models/admin.js";


import { asyncWrapper } from "../middlewares/async.js";


import uploader from "../middlewares/multer.js";


import cloudinary from "../middlewares/cloudinary.js";





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
      .json({ message: "Something went wrong", error: err.message });
  }
});



 //get all posts
 export const viewPosts = asyncWrapper(async (req, res) => {

    try {
      const model= adminPosts.find((err, stats)=>{
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
  


export const createPosts =  asyncWrapper(async (req, res) => {
  const{
    userid,
    username,
   name,
    profileUrl,
    cartegory, 
    heading,
    thread,
    role,
    rate,
    comment,
    location,
    date,
    time,
    message,
    imageurl,
    videourl
  
  }=req.body;
    try {
        const addPosts= new adminPosts({userid,
          username,
         name,
          profileUrl,
          cartegory, 
          heading,
          thread,
          role,
          rate,
          comment,
          location,
          date,
          time,
          message,
          imageurl,
          videourl});
        addPosts.save();
      res.status(201).json({ message: "Sucessfully added your post", data: addPosts });
    
       
    } catch (err) {
      res
        .status(500)
        .json({ message: "Something went wrong", error: err.message });
    }
  });
 