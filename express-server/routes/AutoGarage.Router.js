const Router = require("express");
const autoGarageController = require("../controllers/AutoGarage.Controller");
const roleMiddleware = require("../middlewares/Role.Middleware"); // Middleware проверки на доступ по должности

const router = new Router();

router.get("/autogarage/get", autoGarageController.getAutoGarage);
router.get("/autogarage/get/:id", autoGarageController.getOneAutoGarage);
router.get(
  "/autogarage/access",
  roleMiddleware(["Админ"]),
  autoGarageController.getAccess
);
router.delete(
  "/autogarage/delete/:id",
  roleMiddleware(["Админ"]),
  autoGarageController.deleteAutoGarage
);
router.put(
  "/autogarage/change",
  roleMiddleware(["Админ"]),
  autoGarageController.updateAutoGarage
);
router.post(
  "/autogarage/create",
  roleMiddleware(["Админ"]),
  autoGarageController.createAutoGarage
);

module.exports = router;
