/**
 * Routes for express app
 */
import passport from 'passport';
import controllers from '../db/controllers';

const {
  tags: tagsController,
  users: usersController,
  proposals: proposalsController } = controllers;

export default (app) => {
  // user routes
  app.post('/login', usersController.login);
  app.post('/signup', usersController.signUp);
  app.post('/logout', usersController.logout);

  // google auth
  // Redirect the user to Google for authentication. When complete, Google
  // will redirect the user back to the application at
  // /auth/google/return
  // Authentication with google requires an additional scope param, for more info go
  // here https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
  app.get('/auth/google', (req, res, next) => {
    req.session.returnTo = req.query.returnTo;
  }, passport.authenticate('google', {
    scope: [
      'profile',
      'email'
    ]
  }));

  // Google will redirect the user to this URL after authentication. Finish the
  // process by verifying the assertion. If valid, the user will be logged in.
  // Otherwise, the authentication has failed.
  app.get('/auth/google/callback', (req, res, next) => {
      console.log('Request URL:', req.originalUrl);
      next();
  }, passport.authenticate('google', (req, res) => {
    if (req.session.returnTo) {
      console.log('redirecting to ' + req.session.returnTo);
      res.redirect(req.session.returnTo);
      delete req.session.returnTo;
    } else {
      res.redirect('/');
    }
  }));

  // tag routes
  app.get('/tag', tagsController.all);
  app.post('/tag/:id', tagsController.add);
  app.delete('/tag/:id', tagsController.remove);
};
