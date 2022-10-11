import mongoose from "mongoose";

const CommentSchema = mongoose.Schema({
  userid: { type: String, required: true},
  username: { type: String, required: true},
  name: { type: String, required: true},
  profileurl: { type: String, required: true},
  thread: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  message: { type: String, required: true },
  imageurl: { },
  videourl: { },

  
});




export default mongoose.model("Comment", CommentSchema);