const { compare } = require("bcrypt");
const {
  createUser,
  findUserByEmail,
  // findUserById,
  // getAllUsers,
  getUser,
  deleteUserById,
  updateUser
} = require("../service/user.service.js");
const { signJwt, verifyJwt } = require("../utils/jwt.js");
const bcrypt = require("bcrypt")

// // if we dont write a type we get error because we define in jsconfig noImplicitAny:true;
// exports.getUsers = async function (request, response) {
//   try {
//     console.log("getUsers");

//     const users = await getAllUsers();
//     response.status(200);
//     response.json(users);
//   } catch (error) {
//     response.status(500).send(error);
//   }
// };

exports.updateUser = async function (request, response) {

  try {
    const id = request.params.id;
    const findUser = await findUserByEmail(request.body.user_email);
    const thisUser = await getUser(id);
    if (findUser && findUser.user_name != thisUser.user_name) {
      throw new Error("The email is exists in the system");
    }
    const hashedhPassword = await bcrypt.hash(request.body.user_password, 10);
    request.body.user_password = hashedhPassword;
    await updateUser(id, request.body);
    const newUser = await getUser(id);
    response.status(200).send(newUser);

  }
  catch (error) {
    response.status(500).send([{ message: error.message }]);
  }

};


exports.deleteUser = async function (request, response) {
  try {
    const id = request.params.id;
    await deleteUserById(id);

    response.status(200).send([{ message: "succsed" }]);

  }
  catch (error) {
    return response.status(500).send([{ message: error.message }]);

  }
};

// exports.getUserById = async function (request, response) {
//   console.log("getUserById");

//   const id = request.params.id;
//   const user = await getUser(id);
//   response.send(user);
// };

exports.authUser = async function (request, response) {
  try {
    const token = request.cookies.token;

    const decode = await verifyJwt(token, "accessTokenPrivateKey");

    if (!decode) throw new Error("token is not valid");
    const user = await getUser(decode._doc._id)
    response.status(200).send({ success: true, user: user || decode });
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
};

exports.logOut = async function (request, response) {
  try {
    response.clearCookie("token");
    response.status(200).send({ success: true, message: "success to logOut" });
  } catch (error) {
    return response.status(500).send(error);
  }
};

exports.signUp = async function (request, response) {
  try {
    const body = request.body;
    const user = await createUser(body);

    const token = signJwt({ ...user }, "accessTokenPrivateKey");

    response.cookie("token", token, { httpOnly: true, maxAge: 1000 * 60 * 60 });
    
    delete user.user_password;

    response.status(201).send(user);
  } catch (error) {
    if (error.code === 11000) {
      error.response?.data[0]?.message
      return response.status(409).send([{ message: "Account already exist" }]);

    }
    return response.status(500).send([{ message: error.message }]);
  }
};

exports.signIn = async function (request, response) {
  try {
    console.log("request.body")
    console.log(request.body)

    const { user_email, user_password } = request.body;
    const user = await findUserByEmail(user_email);
    if (!user) {
      throw new Error("User not exists");
    }
    const isValid = await compare(user_password, user.user_password);

    if (!isValid) throw new Error("Password not valid");

    delete user.user_password;

    const token = signJwt({ ...user }, "accessTokenPrivateKey");

    response.cookie("token", token, { httpOnly: true, maxAge: 1000 * 60 * 60 });

    return response.status(200).send(user);
  } catch (error) {
    return response.status(500).send([{ message: error.message }]);
  }
};

// exports.getCurrentUser = async function (request, response) {
//   try {
//     return response.status(200).json(response.locals.user);
//   } catch (error) {
//     console.log(error);
//     return response.status(500).send(error);
//   }
// };

// exports.verifyUserHandler = async function (req, res) {
//   const id = req.params.id;
//   const verificationCode = req.params.verificationCode;

//   // find the user by id
//   const user = await findUserById(id);

//   if (!user) {
//     return res.send("Could not verify user");
//   }

//   // check to see if they are already verified
//   if (user.verified) {
//     return res.send("User is already verified");
//   }

//   // check to see if the verificationCode matches
//   if (user.verificationCode === verificationCode) {
//     user.verified = true;

//     await user.save();

//     return res.json({ message: "User successfully verified" });
//   }

//   return res.send("Could not verify user");
// };

// exports.forgotPasswordHandler = async function (req, res) {
//   const message =
//     "If a user with that email is registered you will receive a password reset email";

//   const { user_email } = req.body;

//   const user = await findUserByEmail(user_email);

//   if (!user) {
//     return res.send(message);
//   }

//   if (!user.verified) {
//     return res.send("User is not verified");
//   }

//   const passwordResetCode = nanoid();

//   user.passwordResetCode = passwordResetCode;

//   await user.save();

//   // Email Verification

//   // await sendEmail({
//   //   to: user.email,
//   //   from: "test@example.com",
//   //   subject: "Reset your password",
//   //   text: `Password reset code: ${passwordResetCode}. Id ${user._id}`,
//   // });

//   return res.send(message);
// };

// exports.resetPasswordHandler = async function (req, res) {
//   const { id, passwordResetCode } = req.params;

//   const { user_password } = req.body;

//   const user = await findUserById(id);

//   if (
//     !user ||
//     !user.passwordResetCode ||
//     user.passwordResetCode !== passwordResetCode
//   ) {
//     return res.status(400).send("Could not reset user password");
//   }

//   user.passwordResetCode = null;

//   user.user_password = user_password;

//   await user.save();

//   return res.send("Successfully updated password");
// };
