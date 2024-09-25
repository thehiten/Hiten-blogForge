import express from "express";
import { register } from "../controller/user.controller.js";
import { login } from "../controller/user.controller.js";
import { logout } from "../controller/user.controller.js";
import { getMyProfile } from "../controller/user.controller.js";
import { getAdmins } from "../controller/user.controller.js";



import { isAuthenticated } from "../middleware/authUser.js";
const router = express.Router(); // Use express.Router()

// POST request to register a new user
router.post("/register", register);
router.post("/login", login);
router.post("/logout", isAuthenticated,logout);
router.get("/getMyProfile", isAuthenticated , getMyProfile);
router.get("/getAdmins", getAdmins); 
export default router;
 