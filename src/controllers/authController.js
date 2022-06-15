const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Models
const Users = require('../models/Users');

// register user
exports.registerUser = async (req, res) => {

  // Check for existing email id
  const emailExists = await Users.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).json({ message: "Email already exists" });

  const hashedPass = await bcrypt.hash(req.body.password, 10)

  try {
    const userData = await new Users({
      ...req.body,
      password: hashedPass
    }).save();

    res.status(200).json({ message: `${userData.email} registered successfully` })

  } catch (err) {
    res.status(500).json({ message: err })
  }
}

// Admin Login
exports.adminLogin = async (req, res) => {

  try {
    // Check if the user exists
    const user = await Users.findOne({ email: req.body.email })

    // --- Status is 200 for these error messages so that frontend can display them. --- //
    if (!user) return res.status(200).json({ message: "This email doesn't exist!" })

    // Check if the user is admin
    if (!user.isAdmin) return res.status(200).json({ message: "This user is not an admin!" })

    // verify password
    const passCheck = await bcrypt.compare(req.body.password, user.password)
    if (!passCheck) return res.status(200).json({ message: "Invalid Password!" });

    // Generate token
    const authToken = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)

    res.status(200).header("Authorization", authToken).json({
      message: 'Login Successful!',
      token: authToken,
      userId: user._id
    })

  } catch (err) {
    res.status(500).json({ message: err })
  }
}


// Login user
exports.loginUser = async (req, res) => {

  try {
    // Check if the user exists
    const user = await Users.findOne({ email: req.body.email })
    if (!user) return res.status(400).json({ message: "This email doesn't exist!" })

    // verify password
    const passCheck = await bcrypt.compare(req.body.password, user.password)
    if (!passCheck) return res.status(400).json({ message: "Invalid Password!" });

    // Generate token
    const authToken = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)

    res.status(200).header("Authorization", authToken).json({
      message: 'Login Successful!',
      token: authToken,
      userId: user._id
    })

  } catch (err) {
    res.status(500).json({ message: err })
  }
}