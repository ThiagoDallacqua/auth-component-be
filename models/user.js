const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email'});

UserSchema.statics.findOrCreate = ({ email, username }, callback) => {
  return this.findOne({
    email: email,
    username: username,
  }, (err, user) => {
    if (err) {
      return callback(err);
    }
    if (!user) {
      user = new User({
        email,
        username
      });
      user.save((err) => {
        if (err) console.log(err);
        return callback(err, user);
      });
    } else {
      return callback(err, user);
    }
  });
}

const User = mongoose.model('User', UserSchema)

module.exports = () => {
  return User
}
