const { Router } = require("express") ;
const {
  getUsers,
  getUserById,
  updateUser,
  signUp,
  signIn,
  deleteUser,
  authUser,
  logOut,
} = require("../controllers/users.controller.js") ;
const validateResource = require("../middleware/validateResource.js") ;
const {
  userSchema,
  SignInSchema,
} = require("../schema/users.schema.js") ;


const router = Router();

const express = require('express');    

router.put("/updateUser/:id", validateResource(userSchema), updateUser);

router.delete("/deleteUser/:id", deleteUser);

router.get("/", getUsers);

router.get("/getUser/:id", getUserById);


router.post("/signUp", validateResource(userSchema), signUp);

router.post("/signIn", validateResource(SignInSchema), signIn);

router.get("/auth",authUser);

router.get("/logout",logOut)

module.exports = router;