const express= require("express");
const houseController = require("../controller/housecontroller");

const getRouter = express.Router();

getRouter.get('/home', houseController.getAllHouse);
getRouter.get('/categories', houseController.getAllCategories);

module.exports = getRouter;