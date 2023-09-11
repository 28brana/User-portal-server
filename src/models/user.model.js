import { Schema, model } from "mongoose";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    default: "male",
  },
  qualification: String,
  hobbies: [String],
  profileImage: String,
  password: {
    type: String,
    required: true,
  },
});

export default model("User", userSchema);
