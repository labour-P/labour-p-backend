import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  userid: { type: String, required: true },
  thread: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  message: { type: String, required: true },
  imageurl: { type: String, required: true },
  videourl: { type: String, required: true },

  
});




export default mongoose.model("Comment", commentSchema);