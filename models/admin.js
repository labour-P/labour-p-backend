import mongoose from "mongoose";

const adminPostSchema = mongoose.Schema({
  userid: { type: String, required: true},
  username: { type: String, required: true},
  name: { type: String, required: true},
  profileUrl: {},
  thread: {},
  role: { type: String,
    enum: [ "0", "1"],
    default: "0",},
  rate: {},
  comment: {},
  location: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  message: { type: String, required: true },
  imageurl: {  },
  videourl: {  },
});

export default mongoose.model("adminPosts", adminPostSchema);


