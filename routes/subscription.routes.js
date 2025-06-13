import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {
    res.send({title: "get all subscriptions"})
})
subscriptionRouter.get("/:id", (req, res) => {
    res.send({title: "get subscription details by id"})
})
subscriptionRouter.post("/", (req, res) => {
    res.send({title: "Create a new subscription"})
})
subscriptionRouter.put("/:id", (req, res) => {
    res.send({title: "Update subscription"})
})
subscriptionRouter.delete("/:id", (req, res) => {
    res.send({title: "Delete subscription"})
})
subscriptionRouter.get("/user/:id", (req, res) => {
    res.send({title: "get all user subscription"})
})
subscriptionRouter.put("/cancel/:id", (req, res) => {
    res.send({title: "cancel subscription"})
})
subscriptionRouter.get("/upcoming-renewals", (req, res) => {
    res.send({title: "get upcoming renewals"})
})

export default subscriptionRouter;