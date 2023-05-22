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
    isNewUser: "Congrats! Youre registration is success",
    name: "",
    birthday: "",
    phone: "",
    avatarURL: "",
  });

  res.status(201).json({
    email: newUser.email,
    password: newUser.password,
  });
  console.log(newUser);
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
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const updateUser = async (req, res) => {
  const { userId } = req.params;
  //const { _id: owner } = req.user;
  const result = await User.findByIdAndUpdate(
    { userId },
    //{ _id: id, owner },
    { ...req.body },
    { new: true }
  );
  console.log(result);
  if (result === null) {
    next(HttpError(404, "User not found"));
  }
  if (!result) {
    HttpError(404, "User not found");
  }
  res.status(200).json(result);
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({
    status: "204 No Content",
  });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  updateUser: ctrlWrapper(updateUser),
  logout: ctrlWrapper(logout),
};
