import express from "express";

import {
  signin,
  signup,
  update,
  forgetPassword,
  checkResetLink,
  resetPassword,
} from "../controllers/auth.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/forgotpassword", forgetPassword);
router.get("/checklink/:token", checkResetLink);
router.patch("/resetpassword", resetPassword);
router.patch("/update", update);

export default router;
