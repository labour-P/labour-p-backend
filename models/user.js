import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  lga: { type: String, required: true },
  ward: { type: String, required: true },
  pollingUnit: { type: String, required: true },
  age: { type: String, required: true },
});

export default mongoose.model("User", userSchema);


