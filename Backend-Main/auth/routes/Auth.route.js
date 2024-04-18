const { Router } = require("express");
const {
  login,
  logout,
  register,
  viewAccount,
  authorization,
} = require("../controllers/Auth.controller");
const router = Router();

router.post("/account", register);
router.get("/account", viewAccount);
router.post("/login", login);
router.get("/logout", logout);
router.get("/authorization", authorization);

module.exports = router;
