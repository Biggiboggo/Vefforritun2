import express from 'express';
import { validationResult } from 'express-validator';
import { catchErrors } from '../lib/catch-errors.js';
import { listUser, listUserByName, listUsers } from '../lib/db.js';
import passport, { ensureLoggedInUser } from '../lib/login.js';
import { createUser } from '../lib/users.js';
import {
  registrationValidationMiddleware,
  sanitizationMiddleware,
  xssSanitizationMiddleware
} from '../lib/validation.js';

export const userRouter = express.Router();

async function userRoute(req, res, next) {
  const { id } = req.params;
  const { user: { username } = {} } = req || {};
  const user = await listUser(id);
  const userinn = await listUserByName(username);
  if (!user) {
    return next();
  }
  if (userinn.admin === '1') {
    const registered = await listUser(user.id);

    return res.render('user', {
      title: `${user.name} — Notendasíðan`,
      user,
      registered,
      errors: [],
      data: {},
    });
  }
  return res.redirect('/');
}

async function index(req, res) {

  const users = await listUsers();
  const { user: { username } = {} } = req || {};
  const userinn = await listUserByName(username);
  if (userinn.admin === '1') {
    return res.render('users', {
      username,
      users,
      errors: [],
      data: {},
      title: 'Notendur — umsjón',
      admin: true,
    });
  }
  return res.redirect('/');
}

async function me(req, res) {


  const { user: { username } = {} } = req || {};
  const userinn = await listUserByName(username);
  return res.render('me', {
    username,
    userinn,
    errors: [],
    data: {},
    title: 'Notandi',
    admin: true,
  });
}

function login(req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }

  let message = '';

  // Athugum hvort einhver skilaboð séu til í session, ef svo er birtum þau
  // og hreinsum skilaboð
  if (req.session.messages && req.session.messages.length > 0) {
    message = req.session.messages.join(', ');
    req.session.messages = [];
  }

  return res.render('user-login', { message, title: 'Innskráning' });
}

async function validationCheck(req, res, next) {
  const { name, password } = req.body;

  const events = await listUsers();
  const { user: { username } = {} } = req;

  const data = {
    name,
    username,
    password
  };

  const validation = validationResult(req);

  const customValidations = [];

  const eventNameExists = await listUserByName(username);

  if (eventNameExists !== null) {
    customValidations.push({
      param: 'username',
      msg: 'Notandi með þessu nafni er til',
    });
  }

  if (!validation.isEmpty() || customValidations.length > 0) {
    return res.render('user-login', {
      events,
      username,
      title: 'Innskráning',
      data,
      errors: validation.errors.concat(customValidations),
      admin: true,
    });
  }

  return next();
}

function register(req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }

  let message = '';

  // Athugum hvort einhver skilaboð séu til í session, ef svo er birtum þau
  // og hreinsum skilaboð
  if (req.session.messages && req.session.messages.length > 0) {
    message = req.session.messages.join(', ');
    req.session.messages = [];
  }

  return res.render('register', { message, title: 'Skráning' });
}

async function registerRoute(req, res) {
  const { name, username, password } = req.body;
  const admin = '0';
  const created = await createUser(name, username, password, admin);

  if (created) {
    return res.redirect('/users/login');
  }

  return res.render('error');
}

userRouter.get('/', ensureLoggedInUser, catchErrors(index));
userRouter.get('/me', ensureLoggedInUser, catchErrors(me));
userRouter.get('/login', login);
userRouter.post(
  '/login',

  // Þetta notar strat að ofan til að skrá notanda inn
  passport.authenticate('local', {
    failureMessage: 'Notandanafn eða lykilorð vitlaust.',
    failureRedirect: '/users/login',
  }),

  // Ef við komumst hingað var notandi skráður inn, senda á /admin
  (req, res) => {
    res.redirect('/');
  }
);
userRouter.get('/register', register);
userRouter.post(
  '/register',
  registrationValidationMiddleware('description'),
  xssSanitizationMiddleware('description'),
  catchErrors(validationCheck),
  sanitizationMiddleware('description'),
  catchErrors(registerRoute)
);

userRouter.get('/:id', catchErrors(userRoute));
