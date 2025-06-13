import { Router } from "express";

const authRouter = Router();

authRouter.post("/sign-up", (req, res) => {res.send({title: "Hell0"})})
authRouter.post("/sign-in", (req, res) => {res.send({title: "Hell0"})})
authRouter.post("/sign-out", (req, res) => {res.send({title: "Hell0"})})

export default authRouter;