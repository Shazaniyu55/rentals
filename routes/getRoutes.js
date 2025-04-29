const express= require("express");
const houseController = require("../controller/housecontroller");

const getRouter = express.Router();

getRouter.get('/home', houseController.getAllHouse);
getRouter.get('/categories', houseController.getAllCategories);
getRouter.post('/search', houseController.search);
getRouter.get('/states', houseController.getAllState);
getRouter.get('/cart/:id', houseController.cart);



module.exports = getRouter;