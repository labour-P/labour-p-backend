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

import {
  getState,
  getLga,
  getUnit,
  getWard,
}from "../controllers/location.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/verifyAccount", verifyAccount);
router.post("/verifyUsername", verifyUsername);
router.post("/getState", getState);
router.post("/getLga", getLga);
router.post("/getUnit", getUnit);
router.post("/getWard", getWard);

router.post("/forgotpassword", forgetPassword);
router.get("/checklink/:token", checkResetLink);
router.patch("/resetpassword", resetPassword);
router.patch("/update", update);

export default router;
