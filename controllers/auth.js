const { HttpError, ctrlWrapper } = require("../helpers");
const { User } = require("../models/user");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    isNewUser: true,
  });

  res.status(201).json({
    email: newUser.email,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23d" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    id: user._id,
  });
};

const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { isNewUser } = req.user;

  const value = isNewUser ? !isNewUser : isNewUser;
  const update = {
    ...req.body,
    isNewUser: value,
  };
  if (req.file) {
    update.avatarURL = req.file.path;
  }
  const result = await User.findByIdAndUpdate(
    { _id: userId },
    update,
    { new: true }
  ).select("-isNewUser -password");

  if (!result) {
    throw HttpError(404, "User not found");
  }
  res.json(result);
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).end();
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  updateUser: ctrlWrapper(updateUser),
  logout: ctrlWrapper(logout),
};
