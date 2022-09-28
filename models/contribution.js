import mongoose from "mongoose";

const contributionSchema = mongoose.Schema({
  userid: { type: String, required: true },
  type: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  other: { type: String, required: true },
  
});

export default mongoose.model("Contribution", contributionSchema);