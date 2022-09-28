import mongoose from "mongoose";

const donationSchema = mongoose.Schema({
  userid: { type: String, required: true },
  amount: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
 status: { type: String, required: true },
  
});

export default mongoose.model("Donation", donationSchema);