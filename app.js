import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import errorHandler from "./middlewares/error-handler.js";

//routes
import routes from "./routes/routes.js";
import auth from "./routes/auth.js";


import bodyparser from "body-parser";
import connect_db from "./db/db.js";
const app = express();
dotenv.config();

//middlewares
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));

//routes

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json()); 

app.use("/api/auth", auth);
app.use("/api/routes", routes);


app.get("/", function(req, res){
 res.send("welcome to Labour-P API");
 });




app.use(errorHandler);

const port = process.env.PORT || 4000;

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

