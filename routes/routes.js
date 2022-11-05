import express from "express";
import {createPosts,viewPosts,createComments, viewComments, createRate, viewRate, Count, noRate,noComments, findPosts } from "../controllers/posts.js";
import {Contribute,getContribute,getdonate, donate, paymentcallback, paystackcallback } from "../controllers/controllers.js";
import {watsapp } from "../controllers/watsapp.js";

import uploader from "../middlewares/multer.js";


import cloudinary from "../middlewares/cloudinary.js";

const route = express.Router();


route.post("/posts/", createPosts);
route.post("/posts/", viewPosts);
route.post("/findposts/", findPosts);


route.post("/comments/", createComments);

route.post("/norate/",noRate );

route.post("/nocomments/", noComments );
route.post("/count/", Count );

route.post("/viewcomments/", viewComments);
route.post("/rate/", createRate);
route.post("/viewrate/", viewRate);

route.post("/contribute/", Contribute);

route.get("/contribute/", getContribute);


route.post("/donate/", donate);

route.get("/donate/", getdonate);

route.get("/payment-callback/", paymentcallback);

route.get("/paystack-callback/", paystackcallback);




route.post("/watsapp/", watsapp);






route.post("/upload", uploader.single("file"), async (req, res) => {
  const upload = await cloudinary.v2.uploader.upload(req.file.path);
  return res.json({
    success: true,
    file: upload.secure_url,
  });
});


export default route;
