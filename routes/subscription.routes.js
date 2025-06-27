import { Router } from "express";
import { createSubscription, getSubscriptions, getUserSubscriptions } from "../controller/subscription.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", authorize, getSubscriptions)
subscriptionRouter.get("/:id", (req, res) => {
    res.send({title: "get subscription details by id"})
})
subscriptionRouter.post("/", authorize, createSubscription)
subscriptionRouter.put("/:id", (req, res) => {
    res.send({title: "Update subscription"})
})
subscriptionRouter.delete("/:id", (req, res) => {
    res.send({title: "Delete subscription"})
})
subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions)
subscriptionRouter.put("/cancel/:id", (req, res) => {
    res.send({title: "cancel subscription"})
})
subscriptionRouter.get("/upcoming-renewals", (req, res) => {
    res.send({title: "get upcoming renewals"})
})

export default subscriptionRouter;