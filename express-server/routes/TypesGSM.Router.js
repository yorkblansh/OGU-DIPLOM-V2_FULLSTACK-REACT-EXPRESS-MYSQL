const Router = require("express");
const typesGSMController = require("../controllers/TypesGSM.Controller");
const roleMiddleware = require("../middlewares/Role.Middleware"); // Middleware проверки на доступ по должности

const router = new Router();

router.get("/type-gsm/get", typesGSMController.getTypesGSM);
router.get("/type-gsm/get/:id", typesGSMController.getOneTypeGSM);
router.get(
  "/type-gsm/access",
  roleMiddleware(["Админ"]),
  typesGSMController.getAccess
);
router.delete(
  "/type-gsm/delete/:id",
  roleMiddleware(["Админ"]),
  typesGSMController.deleteTypeGSM
);
router.put(
  "/type-gsm/change",
  roleMiddleware(["Админ"]),
  typesGSMController.updateTypeGSM
);
router.post(
  "/type-gsm/create",
  roleMiddleware(["Админ"]),
  typesGSMController.createTypeGSM
);

module.exports = router;
