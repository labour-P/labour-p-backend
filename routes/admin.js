import express from "express";
import {createPosts,viewPosts, stats, viewreport, report, deletekey } from "../controllers/admin.js";

const admin = express.Router();


admin.post("/posts/", createPosts);
admin.get("/viewposts/", viewPosts);

admin.get("/stats/", stats);

admin.get("/viewreport/", viewreport);

admin.post("/report/", report);

admin.post("/delete", deletekey);

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
