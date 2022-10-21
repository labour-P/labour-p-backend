
import donation from "../models/donations.js";
import contribution from "../models/contribution.js";
import got from 'got';

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
  const {
    tx_ref,
    amount,
    email,
    phone,
    name,
    redirect_url}=req.body;
    
  try {
    
      //integration
  const response = await got.post("https://api.flutterwave.com/v3/payments", {
      headers: {
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`
      },
      json: {
          tx_ref: tx_ref,
          amount: amount,
          currency: "NGN",
          redirect_url: redirect_url,
          customer: {
              email: email,
              phonenumber: phone,
              name: name
          },
          customizations: {
              title: "MY TIME,MY VOTE, MY MONEY   OBIDATTI FOREVER   LABOUR PARTY FORWARD EVER",
              logo: "http://figma.com/file/kwufaeqh054s5l68b2ekqT/The-Labor-P-Project?node-id=23%3A3843"
          }
      }
  }).json();
  return res.send(response);
} catch (err) {

    console.log(err.code);
  console.log(err.response.body);
   return res
      .status(500)
      .json({ message: "Something went wrong", error: err.response.body });
  }
});


  
export const paymentcallback = asyncWrapper(async (req, res) => {
  try {
  if (req.query.status === 'successful') {
      const transactionDetails = await Transaction.find({ref: req.query.tx_ref});
      const response = await flw.Transaction.verify({id: req.query.transaction_id});
      if (
          response.data.status === "successful"
          && response.data.amount === transactionDetails.amount
          && response.data.currency === "NGN") {
          // Success! Confirm the customer's payment
          const adddonation= new donation(req.body);
          adddonation.save();
          res
          .status(200)
          .json({ message: "donation recieved" });
      
      } else {
          // Inform the customer their payment was unsuccessful
          res
          .status(400)
          .json({ message: "payment not succesful", error: err.message });
      
      }
  }


  
} catch (err) {
  res
    .status(500)
    .json({ message: "Something went wrong", error: err.message });
}
});