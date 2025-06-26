import express from "express";
import { PORT } from "./config/env.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectToDatabase from "./database/db.js";
import errorMiddleWare from "./middlewares/errrors.middleware.js";
import cookieParser from "cookie-parser";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";

const app = express();

// parses incoming requests with JSON payloads
// this lets you use `req.body` to directly access parsed JSON data
app.use(express.json());

// parses URL-encoded form data from requests (like form submissions)
// `extended: false` means it parses with `querystring` (built-in) instead of `qs`
app.use(express.urlencoded({ extended: false }));

// parses cookies attached to the request and populates `req.cookies`
app.use(cookieParser()); 

app.use(arcjetMiddleware);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

app.use(errorMiddleWare)

app.get("/", (req, res) => {
    res.send("Welcome to subscription tracker api")
})

app.listen(PORT, async() => {
    console.log(`Server is running on port http://localhost:${PORT}`);
    await connectToDatabase();
})

export default app;