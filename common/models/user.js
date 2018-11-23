const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Generic user schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  givenName: {
    type: String,
    required: true,
    trim: "true"
  },
  lastName: {
    type: String,
    required: true,
    trim: "true"
  },
  createdOn: {
    type: Date,
    required: true
  },
  deletedOn: {
    type: Date
  },

});

// Hash password
UserSchema.pre('save', function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

// Validate credentials
UserSchema.statics.authenticate = async function (username, password) {
  const user = await User.findOne({username}).select('+password');
  if (!user) {
    throw new Error(`User not found for username ${username}`);
  } else if (user.deletedOn < Date.now()) {
    throw new Error("User has been deactivated");
  }
  const passwordsMatch = await bcrypt.compare(password, user.password);
  if (!passwordsMatch) {
    throw new Error("Incorrect password");
  }
  return user;
};


// Super-Schema for generic users
const User = mongoose.model('User', UserSchema);

// Schema subclass for Agents
const Agent = User.discriminator("Agent", new mongoose.Schema({

}));


// Schema subclass for Owners
const Owner = User.discriminator("Owner", new mongoose.Schema({

}));

// Schema subclass for Customers
const Customer = User.discriminator("Customer", new mongoose.Schema({
  maximumRent: {
    type: Number,
    require: true
  }
}));

module.exports = {User, Agent, Owner, Customer};