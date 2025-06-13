import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => {
    res.send({title: "get all users"})
})
userRouter.get("/:id", (req, res) => {
    res.send({title: "get user details by id"})
})
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