const Router = require("express");

const router = new Router();

const AccountController = require("../controllers/account.controller");

router.post("/register", AccountController.register);
router.post("/login", AccountController.login);
router.get("/users", AccountController.getAllUsers);

module.exports = router;
