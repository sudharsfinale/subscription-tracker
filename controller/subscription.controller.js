import { SERVER_URL } from "../config/env.js";
import { workflowClient } from "../config/upstash.js";
import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      createdBy: req.user?._id,
    });
    const {workflowRunId} = await workflowClient.trigger({
      url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
      body: {
        subscriptionId: subscription.id
      },
      headers:{
        "content-type" : "application/json"
      },
      retries: 0
    })
    res.status(201).json({ success: true, data: {subscription, workflowRunId} });
  } catch (error) {
    next(error);
  }
};

export const getUserSubscriptions = async (req, res, next) => {
  try {
    if(req.params.id !== req.user?.id){
        const error = new Error("You are not the owner of the account");
        error.status = 401;
        throw error;
    }
    const subscriptions = await Subscription.find({
      createdBy: req?.user?._id,
    });
    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};

export const getSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find();
    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};
