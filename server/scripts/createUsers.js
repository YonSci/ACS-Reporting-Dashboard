import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/User.js"; // Adjust the path to your User model
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

async function generateDefaultPassword() {
  return crypto.randomBytes(8).toString("hex"); // Generates a random 16-character password
}

async function createUsers() {
  const emailList = [
    "yonas.mersha14@gmail.com",
    "yonas.yigezu@un.org",
    "robel.kahsay@un.org",
    "hunegnaw@un.org",
    "ilboudo@un.org",
    "seidoui@un.org",
    "akrem.muhammed@un.org",
  ];

  const users = await Promise.all(
    emailList.map(async (email) => {
      const defaultPassword = await generateDefaultPassword();
      const hashedPassword = await bcrypt.hash(defaultPassword, 10);

      console.log(`Default password for ${email}: ${defaultPassword}`); // Log the password for admin to share with users

      return {
        email,
        hashedPassword,
        isDefaultPassword: true,
        createdAt: new Date(),
      };
    })
  );

  try {
    await User.insertMany(users);
    console.log("Users created successfully");
  } catch (err) {
    console.error("Error creating users:", err);
  }
}

console.log("MONGO_USER_DB:", process.env.MONGO_USER_DB);
console.log("Environment variables loaded:", process.env);

mongoose
  .connect(process.env.MONGO_USER_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas (User Database)");
    createUsers().then(() => mongoose.disconnect());
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));
