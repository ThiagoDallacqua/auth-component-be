class UserDAO {
  constructor(user, connect) {
    this._User = user;
    this._connect = connect;
  }

  register(args, callback) {
    console.log(args)
    const { email, password } = args
    this._connect();

    this._User.register(new this._User({ email }), password, callback)
  }
}

module.exports = () => {
  return UserDAO
}
