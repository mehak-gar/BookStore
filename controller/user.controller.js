import User from "../model/user.model.js";
import bcryptsjs from "bcryptjs";
import jwt from "jsonwebtoken";
// Signup logic
export const signup = async (req, res) => {
  try {
    const { fullname, email, password,role } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User Already Exist" });
    }
    const hashPassword = await bcryptsjs.hash(password, 10);
    const createdUser = new User({
      fullname,
      email,
      role,
      password: hashPassword,
    });
    await createdUser.save();
    res.status(201).json({ message: "User Created Successfully" });
  } catch (error) {
    console.log("Error:" + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Login Logic
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isMatch = await bcryptsjs.compare(password,user.password);
    if (!user || !isMatch) {
      res.status(400).json({ message: "Invalid Credentials" });
    }
    else
    {
        res.status(200).json({message:'Login Successful',user:{
            id:user._id,
            fullname:user.fullname,
            email:user.email

        }})
    }
  } catch (error) {
    console.log("Error:" + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
