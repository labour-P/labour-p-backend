import express from "express";
import {createPosts,viewPosts,createComments, viewComments, createRate, viewRate  } from "../controllers/admin.js";
import {Contribute,getContribute,getdonate, donate } from "../controllers/controllers.js";
import {watsapp } from "../controllers/watsapp.js";

const admin = express.Router();


admin.post("/posts/", createPosts);
admin.get("/posts/", viewPosts);




// admin.post("/comments/", createComments);

// admin.post("/viewcomments/", viewComments);
// admin.post("/rate/", createRate);
// admin.post("/viewrate/", viewRate);

// admin.post("/contribute/", Contribute);

// admin.get("/contribute/", getContribute);


// admin.post("/donate/", donate);

// admin.get("/donate/", getdonate);

// admin.post("/watsapp/", watsapp);



export default admin;
