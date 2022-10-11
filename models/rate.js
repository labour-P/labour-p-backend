import mongoose from "mongoose";

const RateSchemamodel = mongoose.Schema({
  userid: { type: String, required: true},
  username: { type: String, required: true},
  name: { type: String, required: true},
  profileUrl: { },
  thread: { },
  location: { type: String, },
  date: { type: String, required: true },
  time: { type: String, required: true },
  
  
});




export default mongoose.model("Rate", RateSchemamodel);