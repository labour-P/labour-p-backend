
import adminPosts from "../models/admin.js";


import { asyncWrapper } from "../middlewares/async.js";


import uploader from "../middlewares/multer.js";


import cloudinary from "../middlewares/cloudinary.js";


import Usermod from "../models/user.js";
import Postsmo from "../models/posts.js";
import Rate from "../models/rate.js";
import Comments from "../models/comments.js";
import Reports from "../models/report.js";





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



 //get all stats
 export const stats = asyncWrapper(async (req, res) => {

  try {

   const post = await Postsmo.find();
   const rate = await Rate.find();
   const coment= await Comments.find(); 
   const users= await Usermod.find();
   const report= await Reports.find();
   
  const adminpost = await adminPosts.find();
     

     return res.json({  users: Object.keys(users).length,  post: Object.keys(post).length, adminpost: Object.keys(adminpost).length, coment: Object.keys(coment).length, rate: Object.keys(rate).length, report: Object.keys(report).length });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
});



//get all report
export const viewreport = asyncWrapper(async (req, res) => {

  try {
    const model= Reports.find((err, stats)=>{
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




//add report

export const report = asyncWrapper(async (req, res) => {
  const{
    eventid, 
    eventtype
  }=req.body;
    try {
      const reports= await Reports.findOne({ _id: eventid}, (err, stats)=>{
          if(stats==null){
            const gravity= 0;
              const addReport= new Reports({eventid, eventtype, gravity});
                    addReport.save();
  //  res.status(201).json({ message: "Sucessfully Sumbitted your Report", data: addReport });
          
            console.log(stats);
      }else{
        console.log(stats);

        const gravity= report.gravity + 1;
const updated = Reports.findOneAndUpdate({ eventid: eventid, gravity: gravity});
        // return res.json(stats);
      }
    });

      // if(report==[]){ console.log(report)
      //   return res.json(report);
      // }else{
            
      // }

      // const report= await Reports.find({ eventid: eventid}, (err, stats)=>{
      //   if(err){
      //       const gravity= 0;
      //       const addReport= new Reports({eventid, eventtype, gravity});
      //             addReport.save();
      //           res.status(201).json({ message: "Sucessfully Sumbitted your Report", data: addReport });
               
      //   }else{
      //   // const gravity= report.gravity + 1;
// const updated = Reports.findOneAndUpdate({ eventid: eventid, gravity: gravity});
      
        // return res.json(stats);}
        // });  
     
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
});



//deletekey

export const deletekey = asyncWrapper(async (req, res) => {
  const{
    eventid, 
    eventtype
  
  }=req.body;
  try {
   
    switch (eventtype) {
      
      case "userdel":
        const model1= Usermod.deleteOne({_id:eventid}, (err, stats)=>{
          if(err){
              return res.send(err);
          }
          return res.json(stats);
          }); 
      
      break;
      case "postdel":
        const model2= Postsmo.deleteOne({_id:eventid}, (err, stats)=>{
          if(err){
              return res.send(err);
          }
          return res.json(stats);
          });
      break;
      case "comentdel":
        const model3= Comments.deleteOne({_id:eventid}, (err, stats)=>{
          if(err){
              return res.send(err);
          }
          return res.json(stats);
          });
       break;
      case "adminpostdel":
        const model4= adminPosts.deleteOne({_id:eventid}, (err, stats)=>{
          if(err){
              return res.send(err);
          }
          return res.json(stats);
          });
       break;
      case "reportdel":
        const model5= Reports.deleteOne({_id:eventid}, (err, stats)=>{
          if(err){
              return res.send(err);
          }
          return res.json(stats);
          });
       break;
      default:
        return res.json({"message":"invalid format should be userdel or postdel or comentdel or reportdel or adminpostdel  "}) ;
     
     
    }
     

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
 