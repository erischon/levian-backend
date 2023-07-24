import mongoose from "mongoose";

const { Schema } = mongoose;

// Define a schema for a user
const userSchema = new Schema({
  name: String,
  email: String,
  image: String,
  provider: String,
  providerId: String,
});

// Create a model class
const UserModel = mongoose.model("User", userSchema);

export { UserModel };
