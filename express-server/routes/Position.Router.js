const Router = require("express");
const positionController = require("../controllers/position.controller");

const router = new Router();

router.get("/positions/get", positionController.getAllPositions);

module.exports = router;
