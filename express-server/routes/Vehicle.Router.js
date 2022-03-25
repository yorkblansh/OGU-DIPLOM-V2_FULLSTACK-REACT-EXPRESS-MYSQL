const Router = require("express");
const vehicleController = require("../controllers/Vehicle.Controller");
const roleMiddleware = require("../middlewares/Role.Middleware"); // Middleware проверки на доступ по должности

const router = new Router();

router.get("/vehicle/get", vehicleController.getVehicles);
router.get("/vehicle/get/:id", vehicleController.getOneVehicle);
router.get(
  "/vehicle/access",
  roleMiddleware(["Админ"]),
  vehicleController.getAccess
);
router.delete(
  "/vehicle/delete/:id",
  roleMiddleware(["Админ"]),
  vehicleController.deleteVehicle
);
router.put(
  "/vehicle/change",
  roleMiddleware(["Админ"]),
  vehicleController.updateVehicle
);
router.post(
  "/vehicle/create",
  roleMiddleware(["Админ"]),
  vehicleController.createVehicle
);

module.exports = router;
