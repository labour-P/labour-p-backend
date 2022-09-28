import request from "request";
import { asyncWrapper } from "../middlewares/async.js";


export const getState = asyncWrapper(async (req, res) => {
  try {
    var options= {
        "async": true,
        "crossDomain": true,
        "url": "http://allnigeria-api.herokuapp.com/api/v1/states",
        "method": "GET",
        "headers": {
            "accept": "application/json"
        }
     };
    
    request(options, function (error, response) { 
    if (error) throw new Error(error);
    console.log(response.body);
    return response.body;});	

  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
});

export const getLga = asyncWrapper(async (req, res) => {
    const {state}=req.body;
    try {
        var options= {
            "async": true,
            "crossDomain": true,
            "url": "https://http://allnigeria-api.herokuapp.com/api/v1/states/lgas/{state}",
            "method": "GET",
            "headers": {
                "accept": "application/json"
            }
         };
        
        request(options, function (error, response) { 
        if (error) throw new Error(error);
        console.log(response.body);
        return response.body;});	
    
    
    } catch (err) {
      res
        .status(500)
        .json({ message: "Something went wrong", error: err.message });
    }
  });
  

  export const getWard = asyncWrapper(async (req, res) => {
   
        const {lga}=req.body;
        try {
            var options= {
                "async": true,
                "crossDomain": true,
                "url": "https://http://allnigeria-api.herokuapp.com/api/v1/ward/{lga}",
                "method": "GET",
                "headers": {
                    "accept": "application/json"
                }
             };
            
            request(options, function (error, response) { 
            if (error) throw new Error(error);
            console.log(response.body);
            return response.body;});
    } catch (err) {
      res
        .status(500)
        .json({ message: "Something went wrong", error: err.message });
    }
  });
  

  export const getUnit = asyncWrapper(async (req, res) => {
 
        const  {units}=req.body;
        try {
            var options= {
                "async": true,
                "crossDomain": true,
                "url": "https://http://allnigeria-api.herokuapp.com/api/v1/units/{state}",
                "method": "GET",
                "headers": {
                    "accept": "application/json"
                }
             };
            
            request(options, function (error, response) { 
            if (error) throw new Error(error);
            console.log(response.body);
            return response.body;});

     } catch (err) {
      res
        .status(500)
        .json({ message: "Something went wrong", error: err.message });
    }
  });
  