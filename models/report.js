import mongoose from "mongoose";

const ReportsSchema = mongoose.Schema({
  eventid: { type: String, required: true},
  eventtype: { type: String, required: true},
  gravity: {},
 
});

export default mongoose.model("Reports", ReportsSchema);


