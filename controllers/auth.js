const { ctrlWrapper } = require("../helpers");

const register = async (req, res) => { };

const login = async (req, res) => { };

const updateUser = async (req, res) => { };

const logout = async (req, res) => {};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  updateUser: ctrlWrapper(updateUser),
  logout: ctrlWrapper(logout),
};
