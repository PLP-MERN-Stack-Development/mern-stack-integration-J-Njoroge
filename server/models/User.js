const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: [true, 'Please provide username'], unique: true, trim: true },
  password: { type: String, required: [true, 'Please provide password'], minlength: 6 },
});

module.exports = mongoose.model('User', userSchema);