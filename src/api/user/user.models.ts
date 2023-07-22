import mongoose from "mongoose";

const { Schema } = mongoose;

// Define a schema for a user
const userSchema = new Schema({
  googleId: String,
  name: String,
});

// Create a model class
const UserModel = mongoose.model("User", userSchema);

export { UserModel };
