
import State from "../models/state.js";

import { asyncWrapper } from "../middlewares/async.js";

// sava state data
export const addState = asyncWrapper(async (req, res) => {
  try {
      const newstate= new State(req.body);
      newstate.save();
    res.status(201).json({ message: "Sucessfully added a ratiing" });
  
     
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
});
