const { Router } = require("express") ;
const {
  // getUsers,
  // getUserById,
  updateUser,
  signUp,
  signIn,
    // getCurrentUser,
  // verifyUserHandler,
  // forgotPasswordHandler,
  deleteUser,
  // resetPasswordHandler,
  authUser,
  logOut,
} = require("../controllers/users.controller.js") ;
const validateResource = require("../middleware/validateResource.js") ;
const {
  userSchema,
  SignInSchema,
  // forgotPasswordSchema,
  // resetPasswordSchema,
  // verifyUserSchema
} = require("../schema/users.schema.js") ;


const router = Router();

const express = require('express');    

router.put("/updateUser/:id", validateResource(userSchema), updateUser);

router.delete("/deleteUser/:id", deleteUser);

//router.get("/", getUsers);

//router.get("/getUserById/:id", getUserById);


router.post("/signUp", validateResource(userSchema), signUp);

router.post("/signIn", validateResource(SignInSchema), signIn);

//router.get("/me", getCurrentUser);

router.get("/auth",authUser);

router.get("/logout",logOut)

// router.post(
//   "/verify/:id/:verificationCode",
//   validateResource(verifyUserSchema),
//   verifyUserHandler
// );

// router.post(
//   "/forgotpassword",
//   validateResource(forgotPasswordSchema),
//   forgotPasswordHandler
// );

// router.post(
//   "/resetpassword/:id/:passwordResetCode",
//   validateResource(resetPasswordSchema),
//   resetPasswordHandler
// );

module.exports = router;
