
import fault from "../models/fault.js";
import { asyncWrapper } from "../middlewares/async.js";

//faultall
//this controller allows to get all data 
export const faultall = asyncWrapper(async (req, res) => {
    try {
     
        fault.find((err, stats)=>{
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
  




//faultfind
//this controller allows to get only data related to an id
export const faultfind = asyncWrapper(async (req, res) => {
    try {
     const query= {};
        if(req.query.status){
            query.status=req.query;
               }
        fault.findById(req.params.faultid,(err, stats)=>{
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
  


//filtering faults
//this controller allows you to search for a fault by filtering 
export const faultfilter = asyncWrapper(async (req, res) => {
    try {
       
    const query= {};
    if(req.query.status){
        query.status=req.query.status;
    } 

  
     if(req.query.faultid){
        query.faultid=req.query.faultid;
    }

 if(req.query.userid){
        query.userid=req.query.userid;
    }

 if(req.query.department){
    query.department=req.query.department;
}
 if(req.query.technician){
    query.technician=req.query.technician;
}
 if(req.query.providers){
    query.providers=req.query.providers;
}
 if(req.query.cost){
    query.cost=req.query.cost;
}
 if(req.query.feedback){
    query.feedback=req.query.feedback;
}
 if(req.query.frequency){
    query.frequency=req.query.frequency;
} 
 if(req.query.geolocation){
    query.geolocation=req.query.geolocation;
}
    fault.find(query,(err, stats)=>{
        if(err){
            res.status(500)
            return res.send(err);
        }
        res.status(201)
       return res.json(stats);
    });   
       
    } catch (err) {
      res
        .status(500)
        .json({ message: "Something went wrong", error: err.message });
    }
  });
  
//faultadd

// this controller allows to add a fault

export const faultadd = asyncWrapper(async (req, res) => {
    try {
        const addfault= new fault(req.body);
        addfault.save();
      res.status(201).json({ message: "Sucessfully added your fault" });
    
       
    } catch (err) {
      res
        .status(500)
        .json({ message: "Something went wrong", error: err.message });
    }
  });
  
