const express = require('express');
const router = express.Router();
const productsRouter = require("./products.router");

router.use("/", productsRouter);

module.exports = router;