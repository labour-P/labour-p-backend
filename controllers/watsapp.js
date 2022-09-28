

import { asyncWrapper } from "../middlewares/async.js";
export const watsapp = asyncWrapper(async (req, res) => {
 
    const  {phone}=req.body;
    try {
        var options= {
            "async": true,
            "crossDomain": true,
            "url": "https://http://api.whatsapp.com/send?{phone}",
            "method": "POST",
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