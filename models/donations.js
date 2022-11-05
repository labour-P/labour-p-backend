import mongoose from "mongoose";

const donationsSchema = mongoose.Schema({
  userid: { type: String },
  amount: { type: String},
  date: { type: String},
  time: { type: String},
 name: { type: String},
 account: { type: String },
contact: { type: String},



 
  
});

export default mongoose.model("Donations", donationsSchema);