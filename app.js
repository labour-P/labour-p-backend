import express from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
import cors from "cors";
import errorHandler from "./middlewares/error-handler.js";

import cloudinaryconfig from "./middlewares/cloudinary.js";
import uploader from "./middlewares/multer.js";

import formidable from 'formidable';
const upload = multer({ dest: 'uploads/',storage: multer.diskStorage({}),
limits: { fileSize: 52428800 } })



//routes
import routes from "./routes/routes.js";
import auth from "./routes/auth.js";
import admin from "./routes/admin.js";


import bodyparser from "body-parser";
import connect_db from "./db/db.js";
import { rmSync } from "fs";
const app = express();
dotenv.config();

cloudinary.v2.config({ 
  cloud_name: 'dbexrzrgs', 
  api_key: '724351726478768', 
  api_secret: 'LCoKD-mQSoeuPC9uwXO27c7PAW8' 
  
});
//middlewares
app.use(express.json());
app.use(cors({ origin: "*" }));
//for parsing multipart/form-data
app.use(express.static('public'));


//routes
//app.use(limit(100000000));
app.use(bodyparser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyparser.json({limit: '50mb'})); 

app.use("/api/auth", auth);
app.use("/api/routes", routes);
app.use("/api/admin", admin);




app.get("/", function(req, res){
 res.send("hello and welcome to Labour-P API, The  server is up and running");
 });
 
 //upload.single('file')
 
 //upload.array('file',9)

 
 app.post('/upload', upload.single('file'), async (req, res, next) =>{

  try{
  // req.file is the `avatar` file
 //return res.send(req)
  const uploadres = await cloudinary.uploader.upload(req.file.path, {upload_preset: "dev_setup"});
  console.log(uploadres);
   return res.json({
    success: true, url: uploadres.secure_url

   });

  // req.body will hold the text fields, if there were any
  }catch(err){}
});




app.use(errorHandler);

const port = process.env.PORT || 8080;

const start = () => {
 try {
   //import db connection function here
   connect_db();
   app.listen(port, () => {
     console.log(`Everything soft on port ${port}`);
   });
   //log the db connection status
 } catch (err) {
   console.log(err);
 }
};

start();

