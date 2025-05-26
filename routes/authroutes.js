const express= require("express");
const authController = require("../controller/usercontroller");


const authRouter = express.Router();

function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
      return next();
    } else {
      res.redirect('/login');
    }
  }

authRouter.post('/register', authController.register);
authRouter.post('/verify', authController.verifyOtp);
authRouter.get('/profile', authController.verifyOtp);
authRouter.post('/login', authController.login);


module.exports = authRouter;