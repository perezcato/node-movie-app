const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const knex = require('../knex');

const userValidator = require('../validators/user.validate');

const newToken = (id) => jwt.sign({ userId: id }, 'movies', { expiresIn: 60 * 60 });

const verifyToken = (token) => new Promise((resolve, reject) => {
  jwt.verify(token, 'movies', (err, decoded) => {
    if (!err) resolve(decoded);
    reject(err);
  });
});

exports.protect = async (req, res, next) => {
  try {
    if (!req.headers.authorization) next(createError(400, 'Authorization header not found'));
    const token = req.headers.authorization.split('Bearer ')[1];
    if (!token) next(createError(400, 'Authorization token not found'));
    const { userId } = await verifyToken(token);
    if (!userId) next(createError(400, 'Invalid Token'));
    const [user] = await knex('users')
      .where('id', userId).select('id', 'email', 'password');
    req.user = user;
    next();
  } catch (e) {
    if (e.name === 'TokenExpiredError') next(createError(403, e));
    next(createError(500, e));
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const { value: userData, error } = await userValidator.validate(req.body);
    if (error) next(createError(422, error));
    const [user] = await knex('users').where({
      email: userData.email,
      password: userData.password,
    }).select();
    console.log(user.id);
    if (user) res.json({ token: newToken(user.id) });
    else next(createError(403, 'Invalid username or password'));
  } catch (e) {
    next(e);
  }
};

exports.signUp = async (req, res, next) => {
  try {
    const userData = await userValidator.validate(req.body);
    if (userData.error) { next(createError(422, userData.error)); } else {
      const userId = await knex('users')
        .returning('id')
        .insert(userData.value);
      const userToken = newToken(userId[0]);
      res.status(200);
      res.json({
        userToken,
      });
      res.end();
    }
  } catch (error) {
    res.status(422);
    next(error);
  }
};
