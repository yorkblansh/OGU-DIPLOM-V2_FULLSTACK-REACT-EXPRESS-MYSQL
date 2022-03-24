const Router = require("express");
const positionController = require("../controllers/Position.Controller");

const router = new Router();

router.get("/positions/get", positionController.getAllPositions);
router.get("/position/get/:id", positionController.getOnePosition);

module.exports = router;
