import { Router } from "express";
import { getUser, getUsers } from "../controller/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", authorize ,getUsers)
userRouter.get("/:id", getUser)
userRouter.post("/", (req, res) => {
    res.send({title: "Create a new user"})
})
userRouter.put("/:id", (req, res) => {
    res.send({title: "Update user"})
})
userRouter.delete("/:id", (req, res) => {
    res.send({title: "Delete user"})
})

export default userRouter;