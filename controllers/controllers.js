
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
      //integration
  const response = await got.post("https://api.flutterwave.com/v3/payments", {
      headers: {
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`
      },
      json: {
          tx_ref: "hooli-tx-1920bbtytty",
          amount: "100",
          currency: "NGN",
          redirect_url: "https://webhook.site/9d0b00ba-9a69-44fa-a43d-a82c33c36fdc",
          meta: {
              consumer_id: 23,
              consumer_mac: "92a3-912ba-1192a"
          },
          customer: {
              email: "user@gmail.com",
              phonenumber: "080****4528",
              name: "Yemi Desola"
          },
          customizations: {
              title: "Pied Piper Payments",
              logo: "http://www.piedpiper.com/app/themes/joystick-v27/images/logo.png"
          }
      }
  }).json();
} catch (err) {

    console.log(err.code);
  console.log(err.response.body);
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
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
      } else {
          // Inform the customer their payment was unsuccessful
      }
  }


  
} catch (err) {
  res
    .status(500)
    .json({ message: "Something went wrong", error: err.message });
}
});