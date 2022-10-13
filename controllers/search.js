import { asyncWrapper } from "../middlewares/async.js";
import technician from "../models/technician.js";
//import { createCustomAPIError } from "../errors/custom-error";

export const findTechnicianBySearch = asyncWrapper(async (req, res) => {
  const { category, ip } = req.query;
  let location;
  try {
    //make api call to find user location

    // location = result from call

    const jobTitle = new RegExp(category, "i");

    const technicians = await technician.find({
      $or: [{ jobTitle }, { location: { $or: location.ip } }],
    });

    res.json({ data: technicians });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
