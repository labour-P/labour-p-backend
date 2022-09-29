import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  userid: { type: String,  },
  thread: { type: String,  },
  location: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  message: { type: String, required: true },
  imageurl: { type: String,  },
  videourl: { type: String,  },

  
});

export default mongoose.model("Posts", postSchema);


