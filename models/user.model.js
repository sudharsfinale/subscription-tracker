import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "User name is required"],
    trim: true,
    minLength: 2,
    maxLength: 50,
  },
  email: {
    type: String,
    required: [true, "User email is required"],
    trim: true,
    minLength: 5,
    maxLength: 255,
    lowercase: true,
    match:[/\S+@\S+\.\S+/, "Please enter valid email address"]
  },
  password: {
    type: String,
    required: [true, "User password is required"],
    minLength: 6,
  },
}, {timestamps:true});

const User = mongoose.model("User", userSchema);

export default User;

// {name : "Sudharsan", email:"sudharsfinale@gmail.com", password: sudhars}