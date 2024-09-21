const { compare } = require("bcrypt");
const {
  createUser,
  findUserByEmail,
  getUsers,
  getUser,
  deleteUserById,
  updateUser
} = require("../service/user.service.js");
const { signJwt, verifyJwt } = require("../utils/jwt.js");
const bcrypt = require("bcrypt")

exports.getUsers = async function (request, response) {
  try {
    const users = await getAllUsers();
    response.status(200).send(users);
  } catch (error) {
    response.status(500).send([{ message: error.message }]);
  }
};

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

exports.getUserById = async function (request, response) {
  try {
    const id = request.params.id;
    const user = await getUser(id);
    response.status(200).send(user);

  } catch (error) {
    return response.status(500).send([{ message: error.message }]);
  }
};

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