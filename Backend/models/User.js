const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Define user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Instance method to generate JWT token
userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// Create and export model
const User = mongoose.model('User', userSchema);
module.exports = User;
