const User = require('../models/Users');
const { generateToken } = require('../middleware/auth');

const registerUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    console.log("register",req.body)

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        console.log("register existingUser")
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({ email, password, role });
    console.log("register new - 18", user)
    await user.save();
    console.log("register new", user)
    res.status(201).json({
      _id: user._id,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log("login",req.body)
    // Check if user exists
    const user = await User.findOne({ email });
    console.log("login",user)
    if (!user) {
      console.log("no user")
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Validate password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({
      _id: user._id,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      _id: user._id,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile', error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile
};
