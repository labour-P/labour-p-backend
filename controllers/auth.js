import { asyncWrapper } from "../middlewares/async.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import user from "../models/user.js";
import Token from "../models/Token.js";
import  {sms} from "../middlewares/tarmi.js";

// import { verifyemail, forgotPassword, signupSuccess } from "../mail/mailgun.js";
//import { createCustomAPIError } from "../errors/custom-error";

const secret = "myawesome-secret";
//signin
export const signin = asyncWrapper(async (req, res) => {
  try {
    const { email, password } = req.body;

    const oldUser = await user.findOne({ email });

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
  const {email,
    phone} = req.body;
    try {
      const emailexist = await user.findOne({ email });
      const phoneexist = await user.findOne({ phone });
      if (emailexist || phoneexist ){
        return res.status(400).json({ message: "User already exists" });
      }else{
          return sms({phone});
        }

    } catch (err) {
      res
        .status(500)
        .json({ message: "Something went wrong", error: err.message });
    }
  });


  
// verifyAccount
export const verifyUsername = asyncWrapper(async (req, res) => {
  const {username} = req.body;
    try {
      const usernameexist = await user.findOne({ username });
      
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
    firstName,
    lastName,
    userName,
    email,
    address,
    password,
    phone,
    city,
    state,
    lga,
    ward,
    pollingUnit,
    age,
  } = req.body;
  try {
    const oldUser = await user.findOne({ email });

   
    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await user.create({
      password: hashedPassword,
      name: `${lastName} ${firstName}`,
      userName,
      phone,
      email,
      address,
      city,
      state,
      lga,
    ward,
    pollingUnit,
    age,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "2h",
    });
   
    // signupSuccess(result.name, email, password);
    // res.status(201).json({ result, token });
    // sms({phone});
    const sms =await sms({phone});
    res.status(201).json({ smsresponse, sms });
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

    const user = await user.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({
        message: `we couldnt find a user with this email -${req.body.email}`,
      });
    }

    let token = await Token.findOne({ userId: user._Id });

    if (!token) {
      token = await new Token({
        userId: user._id,
        resetPasswordToken: crypto.randomBytes(20).toString("hex"),
      }).save();
    }

    const link = `https://labourp.com/passwordreset/?token=${token.resetPasswordToken}&id=${user._id}&email=${req.body.email}`;

    forgetPassword(user.email, link);
    return res.status(200).json({
      message: `a link has been sent to your email -${req.body.email}`,
    });
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
  try {
    const user = await user.findOne({ _id: req.body.id });

    if (!user) return res.status(404).json({ message: "user does not exist" });

    if (req.body.password !== req.body.confirmPassword) {
      return res.status(404).json({ message: "password doesn't match" });
    }
    const hashedpassword = await bcrypt.hash(req.body.password, 12);

    user.password = hashedpassword;
    user.save();
    return res.status(200).json({ message: "password changed successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "something went wrong", error: err.message });
  }
});

export const update = asyncWrapper(async (req, res) => {
  res.status(200).json({ message: "All tasks loaded" });
});
