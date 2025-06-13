`This is an Express error handling middleware.
It intercepts any error that occurs in your Express routes and converts it into a unified, clear, and appropriate API response.`;
const errorMiddleWare = (err, req, res, next) => {
  try {
    /* ✅ 1. Initializes a new error object from err: */
    let error = { ...err };
    error.message = err.message;
    /* It copies all properties from the original err into a new error object.
       It then explicitly sets error.message to err.message.
       (This is necessary because spreading err sometimes drops non-enumerable properties like message).
    */
    //Mongoose bad objectId
    /* ✅ 2. Handles specific cases:
       ➥ Invalid ObjectId (CastError)
       This typically occurs when you have a route like: GET /items/:id */
    if (err.name === "CastError") {
      const message = "Resource not Found";
      error = new Error(message);
      error.statusCode = 404;
    }

    //Mongoose duplicate key
    /* 
    ➥ Duplicate key (Error code 11000)
    This happens when you violate a unique index in your Schema (like attempting to create a User with an already existing email).
    So it converts this to a 400: 
    */
    if (err.code === 11000) {
      const message = "Duplicate field value entered";
      error = new Error(message);
      error.statusCode = 400;
    }

    //Mongoose validation error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((val) => val.message);
      error = new Error(message.join(", "));
      error.statusCode = 400;
    }

    res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message || "Server error" });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleWare;

`Summary:
✅ Purpose:
To handle different kinds of API errors gracefully and respond with clear messages and proper HTTP codes instead of letting your application crash.

✅ How:
➥ Initializes a custom error
➥ Checks for common cases (bad ObjectId, duplicates, validation)
➥ Sets a helpful message and appropriate statusCode
➥ Sends back a standardized JSON error response to the client
➥ Falls back gracefully if something goes awry during this process

If you'd like, I can show:
➥ A complete Express application integrating this.
➥ An example of how it's used in a controller.
Just let me know!`
