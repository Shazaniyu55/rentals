const express = require("express");
const authRouter = require("./authroutes")
const getRoutes = require("./getRoutes");

const indexRouter = express.Router();

indexRouter.use('/auth', authRouter);
indexRouter.use('/get', getRoutes);

module.exports = indexRouter;