import bcrypt from "bcrypt";
import catchAsync from "../utils/catchAsync";
import userModel from "../models/userModel";

export const registerUser = catchAsync(async (req, res) => {
  const userData = req.body;

  const existingUser = await userModel.findOne({ email: userData.email });

  if (existingUser) {
    return res.status(400).json({
      message: "User with this email already exists.",
    });
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

  userData.password = hashedPassword;

  const newUser = await userModel.create(userData);

  return res.status(201).json({
    user: newUser,
    message: "User registration successful!",
  });
});

export const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials. Please check your email and password.",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid credentials. Please check your email and password.",
    });
  }

  return res.status(200).json({
    user,
    message: "Login successful!",
  });
});

export const updateUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const updatedUserData = req.body;

  const user = await userModel.findById(userId);

  if (!user) {
    return res.status(404).json({
      message: "User not found.",
    });
  }

  Object.assign(user, updatedUserData);
  await user.save();

  return res.status(200).json({
    user,
    message: "User data updated successfully.",
  });
});

export const changePassword = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const { oldPassword, newPassword } = req.body;

  const user = await userModel.findById(userId);

  if (!user) {
    return res.status(404).json({
      message: "User not found.",
    });
  }

  const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid old password.",
    });
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

  user.password = hashedPassword;
  await user.save();

  return res.status(200).json({
    message: "Password changed successfully.",
  });
});
