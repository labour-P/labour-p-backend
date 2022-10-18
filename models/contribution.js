import mongoose from "mongoose";

const contributionSchema = mongoose.Schema({
  userid: { type: String },
  type: { type: String },
  location: { type: String },
  date: { type: String },
  time: { type: String },
  other: { type: String },
  
});

export default mongoose.model("Contribution", contributionSchema);