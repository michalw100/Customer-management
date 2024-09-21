const UserModel = require("../models/users.model.js");

exports.createUser = function (user) {
  return UserModel.create(user);
};

exports.findUserByEmail = function (user_email) {
  return UserModel.findOne({ user_email });
};

exports.getUsers = function () {
  return UserModel.find();
};

exports.getUser = function (id) {
  return UserModel.findById(id);
};

exports.deleteUserById = function (id) {
  return UserModel.findByIdAndDelete(id);
};

exports.updateUser = async function (id,body) {
  return await UserModel.findByIdAndUpdate(id,body);
};