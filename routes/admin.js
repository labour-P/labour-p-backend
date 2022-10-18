import express from "express";
import {createPosts,viewPosts,createComments, viewComments, createRate, viewRate  } from "../controllers/admin.js";
import {Contribute,getContribute,getdonate, donate } from "../controllers/controllers.js";
import {watsapp } from "../controllers/watsapp.js";

const route = express.Router();


route.post("/posts/", createPosts);
route.get("/posts/", viewPosts);




// route.post("/comments/", createComments);

// route.post("/viewcomments/", viewComments);
// route.post("/rate/", createRate);
// route.post("/viewrate/", viewRate);

// route.post("/contribute/", Contribute);

// route.get("/contribute/", getContribute);


// route.post("/donate/", donate);

// route.get("/donate/", getdonate);

// route.post("/watsapp/", watsapp);



export default route;