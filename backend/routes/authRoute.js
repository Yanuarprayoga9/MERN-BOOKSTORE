import express from "express";
import { auth } from "../models/authModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// login
router.post("/login", async (req, res) => {
  const { username, email, password } = req.body;
  const exist = await auth.findOne({ username });
  if (!exist) {
    res.json("username atau email tidak terdaftar");
  } else {
    const passwordMatch = bcrypt.compareSync(password, exist.password);
    if (passwordMatch) {
      const token = jwt.sign(
        { _username: exist.username },
        process.env.SECRET_TOKEN
      );
      res.status(200).header("auth-token", token).send(token);
    } else {
      res.status(401).json({ error: "Kata sandi salah" });
    }
  }
});

// register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const exist = await auth.findOne({ username });
  try {
    if (exist) {
      res.json({ msg: "user exist" });
    } else {
      if (!username && !email && !password) {
        res.json({ message: "field must be filled" });
      }
      const hashPassword = await bcrypt.hash(password, 10);
      const user = await auth.create({
        username,
        email,
        password: hashPassword,
      });
      res.json(user);
    }
  } catch (error) {
    res.json({ msg: error.message });
  }
});
router.post("/logout", (req, res) => {
  // In a real implementation, you should invalidate the token on the server-side.
  // For simplicity, we are removing the "auth-token" header.

  // Remove the "auth-token" header
  req.removeHeader("Authorization");

  res.json({ message: "User logged out successfully" });
});router.get("/", (req, res) => {});
export default router;
