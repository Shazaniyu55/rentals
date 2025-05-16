const express= require("express");
const houseController = require("../controller/housecontroller");

const getRouter = express.Router();


function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
      return next();
    } else {
      res.redirect('/login');
    }
  }

getRouter.get('/home', houseController.getAllHouse);
getRouter.get('/categories', houseController.getAllCategories);
getRouter.post('/search', houseController.search);
getRouter.get('/states', houseController.getAllState);
getRouter.get('/cart/:id', houseController.cart);



module.exports = getRouter;