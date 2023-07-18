import mongoose from "mongoose";

const { Schema } = mongoose;

// Define a schema for a user
const userSchema = new Schema({
  googleId: String,
});

// Create a model class
const UserModel = mongoose.model("users", userSchema);

export { UserModel };
