import express from "express";

import {
  signin,
  signup,
  update,
  forgetPassword,
  checkResetLink,
  resetPassword,
  verifyAccount,
  verifyUsername,
  
} from "../controllers/auth.js";

import {sms} from "../middlewares/tarmi.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/verifyAccount", verifyAccount);
router.post("/verifyUsername", verifyUsername);
// router.post("/getState", getState);
// router.post("/getLga", getLga);
// router.post("/getUnit", getUnit);
// router.post("/getWard", getWard);

router.post("/forgotpassword", forgetPassword);
router.post("/resetpassword", resetPassword);
router.post("/update", update);
router.post("/sms", sms);





// router.get("/checklink/:token", checkResetLink);

export default router;
