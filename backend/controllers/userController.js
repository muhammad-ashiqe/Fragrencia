import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//function for generating jwt token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//user registration controller
const userSignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //checking if the user already exist or not
    const exist = await userModel.findOne({ email });

    if (exist) {
      return res.json({ success: false, message: "User already exist" });
    }

    //validating the email and password strength
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please Enter a valid Email",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "enter a strong password",
      });
    }

    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //creating a new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    //saving the new user to database
    const user = await newUser.save();

    //creating jwt token for user
    const token = createToken(user._id);

    //sending response back
    return res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//user login controller
const userLogIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    //checking the user available or not
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "user not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);
      return res.json({ success: true, token });
    }

    if (!isMatch) {
      return res.json({ success: false, message: "invalid credentials" });
    }
  } catch (error) {
    res.json({ success: false, error });
  }
};

//admin login controller
const adminLogIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
        const token = jwt.sign(email+password,process.env.JWT_SECRET)
        return res.json({success:true,token})
    }
  } catch (error) {
    return res.json({success:false,error})
  }
};

export { userLogIn, userSignUp, adminLogIn };
