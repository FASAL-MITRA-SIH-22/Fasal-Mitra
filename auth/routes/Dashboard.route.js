const { Router } = require("express");
const { getDashboardData } = require("../controllers/Dashboard.controller");
const router = Router();

router.get("/dashboard", getDashboardData);

module.exports = router;
