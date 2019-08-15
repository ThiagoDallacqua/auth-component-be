const jwt = require('jsonwebtoken');

const authenticateUser = (model, email, password, res) => {
  const authenticate = model.authenticate()
  authenticate(email, password, (err, { email, _id }) => {
    const payload = {
      user: { email, _id },
      exp: Math.floor(Date.now() / 1000) + ((60 * 60) * 4) // expires in 4 hour
    }
    const token = jwt.sign(payload, 'ilovejavascript');

    res.json({
      success: true,
      token: token
    })
  })
}

module.exports = app => {
  app.post('/register', (req, res) => { //sign up route

    const model = app.models.user;
    const connect = app.infra.connectionFactory;
    const user = new app.infra.UserDAO(model, connect);
    console.log(req.body)

    const userData = {
      email: req.body.email,
      password: req.body.password
    };

    user.register(userData, (err, user) => {
      if (err) {
        console.log(err);
        res.status(500).send(err)

        return
      }

      authenticateUser(app.models.user, req.body.email, req.body.password, res)
      return
    });
  })

  app.post('/login', (req, res) => { //login route
    const connect = app.infra.connectionFactory;

    connect();

    authenticateUser(app.models.user, req.body.email, req.body.password, res)
    return
  });
}
