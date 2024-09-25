import express from "express";

// Importing routes
import { createBlog } from "../controller/blog.controller.js"
import { deleteBlog } from "../controller/blog.controller.js";
import { getBlog } from "../controller/blog.controller.js";
import { getSingleBlog } from "../controller/blog.controller.js";
import { getMyBlog } from "../controller/blog.controller.js";
import {updateBlog} from "../controller/blog.controller.js";


import { isAuthenticated } from "../middleware/authUser.js";
import { isAdmin } from "../middleware/authUser.js";

const router = express.Router(); // Use express.Router()

// POST request to register a new user
router.post("/create", isAuthenticated , isAdmin ,createBlog);
router.delete("/delete/:id", isAuthenticated, isAdmin, deleteBlog);


// "Note: Any user who logs in can see the blog. It’s not only for admins."
router.get("/getBlog", getBlog); 


// if user wants to see their single blog of anyone 
router.get("/getSingleBlog/:id", isAuthenticated, getSingleBlog);


// if user wants to see their own blog 

router.get("/getMyBlog", isAuthenticated, getMyBlog);


router.put("/updateBlog/:id", isAuthenticated, updateBlog);





export default router;
 