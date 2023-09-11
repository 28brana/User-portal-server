import { Router } from "express";
import { changePassword, loginUser, registerUser, updateUserByEmail } from "../controller/user.controller.js";

const userRouter = Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.put("/update", updateUserByEmail);
userRouter.put("/change-password", changePassword);

export default userRouter;
