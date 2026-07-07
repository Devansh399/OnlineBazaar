const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getUsers} = require("../controller/authController");
const{protect} = require('../middleware/authMiddleware');
const {admin}  = require('../middleware/adminMiddleware');



router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", protect, admin, getUsers);  // getUsers fucntion sare users ka data leke aayega. protect and admin ka kaam middleware me krege ye dono hamre middleware hai getUsers function run hone se phle indono ke pass jayega cheez.
// protect check krega ki user properly login hai ya nhi.


// otp router pending---


module.exports = router