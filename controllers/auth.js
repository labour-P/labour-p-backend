import { asyncWrapper } from "../middlewares/async.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Usermod from "../models/user.js";
import Token from "../models/Token.js";
import  {sms} from "../middlewares/sms.js";
import uploader from "../middlewares/multer.js";


import cloudinary from "../middlewares/cloudinary.js";


// import { verifyemail, forgotPassword, signupSuccess } from "../mail/mailgit pullgun.js";
//import { createCustomAPIError } from "../errors/custom-error";

const secret = "myawesome-secret";
//signin
export const signin = asyncWrapper(async (req, res) => {
  try {
    const { email, password } = req.body;

    const oldUser = await Usermod.findOne({ email });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "2h",
    });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
});

//signup




// verifyAccount
export const verifyAccount = asyncWrapper(async (req, res) => {
 
    try {
      const {email,phone} = req.body;
        console.log(phone);
        console.log(email);
        
      const emailexist = await Usermod.findOne({ email });
      const phoneexist = await Usermod.findOne({ phone });
      if (emailexist || phoneexist ){
        res.status(400).json({ message: "User already exists" });
      }else{
        const text= "your otp is:";
        const token= "123567";
        const phonenum= phone;
const message={
token,phonenum,text
};
console.log(phonenum);
        sms({message});
        res
        .status(200)
        .json({ message: "email and phone number available", token: token });
        }

    } catch (err) {
      res
        .status(500)
        .json({ message: "Something went wrong", error: err.message });
    }
  });


  
// verifyUsername
export const verifyUsername = asyncWrapper(async (req, res) => {
  const {username} = req.body;
    try {
      const usernameexist = await Usermod.findOne({ username });
      
      if (usernameexist ){
        return res.status(400).json({ message: "User already exists" });
      }else{
        return res.status(200).json({ message: "Username available" });
        }

    } catch (err) {
      res
        .status(500)
        .json({ message: "Something went wrong", error: err.message });
    }
  });

  
export const signup = asyncWrapper(async (req, res) => {
  const {
    name,
    phone,
    email,
    userName,
    profileUrl,
    role,
    password,
    address,
    city,
    state,
    lga,
    ward,
    pollingUnit,
    age,
   
  } = req.body;
  try {
    const oldUser = await Usermod.findOne({ email });
    const oldUserphone = await Usermod.findOne({ phone });
    const oldUsername = await Usermod.findOne({ userName });

    if (oldUsername)
    return res.status(400).json({ message: "User already exists" });

    if (oldUserphone)
      return res.status(400).json({ message: "User already exists" });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await Usermod.create({
      name,
    phone,
    email,
    userName,
    profileUrl,
    role,
    password: hashedPassword,
    address,
    city,
    state,
    lga,
    ward,
    pollingUnit,
    age,
   
    });

    // const token = jwt.sign({ email: result.email, id: result._id }, secret, {
    //   expiresIn: "2h",
    // });
   

    res
    .status(200)
    .json({ message:"login sucessfull", "result": result });
   
    // signupSuccess(result.name, email, password);
    // res.status(201).json({ result, token });
    //  sms({phone});
    // const sms =await sms({phone});
    // res.status(201).json({ smsresponse, sms });
return result;
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
});

// reset password
export const forgetPassword = asyncWrapper(async (req, res) => {
  try {

    const user = await Usermod.findOne({ phone: req.body.phone });

    if (!user) {
      return res.status(400).json({
        message: `we couldnt find a user with this email -${req.body.phone}`,
      });
    }else{
      const text= "your otp is:";
      const token= "123567";
      const phonenum=req.body.phone;
const message={
token,phonenum,text
};
console.log(phonenum);
      sms({message});
      return res.status(200).json({
        message: 'token sent to this phone ',
        token:token
    });
  }

    // let token = await Token.findOne({ userId: Usermod._Id });

    // if (!token) {
    //   token = await new Token({
    //     userId: Usermod._id,
    //     resetPasswordToken: crypto.randomBytes(20).toString("hex"),
    //   }).save();
    // }

    // const link = `https://labourp.com/passwordreset/?token=${token.resetPasswordToken}&id=${Usermod._id}&email=${req.body.email}`;

    // forgetPassword(Usermod.email, link);

    // return res.status(200).json({
    //   message: `a link has been sent to your email -${req.body.email}`,
    // });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});
// reset password
export const checkResetLink = asyncWrapper(async (req, res) => {
  try {
    let token = await Token.findOne({ resetPasswordToken: req.params.token });

    if (!token) {
      return res.status(400).json({
        message: "link expired or invalid",
      });
    }
    res.status(200).json({ message: "valid" });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});



export const resetPassword = asyncWrapper(async (req, res) => {
  const
  {phone,
  password}=req.body;
  try {
    const user = await Usermod.findOne({ phone: phone });

    if (!user) {
      return res
      .status(404)
      .json({ message: "user does not exist" });
  }
    
    const hashedpassword = await bcrypt.hash(password, 12);

    Usermod.password = hashedpassword;
    Usermod.save();
    return res.status(200).json({ message: "password changed successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "something went wrong", error: err.message });
  }
});


export const update = asyncWrapper(async (req, res) => {
  const {
    id,
    name,
    userName,
    profileUrl,
    
  } = req.body;
  try {
    
    const user = await Usermod.findOne({id});

    if (!user) {return res.status(404).json({ message: "user does not exist" });}
    

     user.name=name;
    user.userName= userName;
    user.profileUrl =profileUrl;
   
    await user.save();
    return res.status(200).json({ message: "profile update successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "something went wrong", error: err.message });
  }
});









