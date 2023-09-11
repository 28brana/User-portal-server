import { Router } from "express";
import { changePassword, loginUser, registerUser, updateUser } from "../controller/user.controller.js";

const userRouter = Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.put("/update/:userId", updateUser);
userRouter.put("/change-password", changePassword);

export default userRouter;
