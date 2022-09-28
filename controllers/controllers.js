
import donation from "../models/donations.js";
import contribution from "../models/contribution.js";

import { asyncWrapper } from "../middlewares/async.js";




 //get all contribution
export const getContribute = asyncWrapper(async (req, res) => {
    try {
     
        contribution.find((err, stats)=>{
            if(err){
                return res.send(err);
            }
           return res.json(stats);
        });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Something went wrong", error: err.message });
    }
  });
  



 //get all contribution
export const getdonate = asyncWrapper(async (req, res) => {
    try {
     
        donation.find((err, stats)=>{
            if(err){
                return res.send(err);
            }
           return res.json(stats);
        });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Something went wrong", error: err.message });
    }
  });





// to make a contribution

export const Contribute = asyncWrapper(async (req, res) => {
    try {
        const addcontribution= new contribution(req.body);
        addcontribution.save();
      res.status(201).json({ message: "Sucessfully added your contribution" });
    
       
    } catch (err) {
      res
        .status(500)
        .json({ message: "Something went wrong", error: err.message });
    }
  });
 
  // to make a donation

  
export const donate = asyncWrapper(async (req, res) => {
  try {
      const adddonation= new donation(req.body);
      adddonation.save();

      //paystack integration goes here

    res.status(201).json({ message: "Sucessfully added your created a donation" });
  
     
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
});