const { Router } = require("express");
const { getMapData } = require("../controllers/Dashboard.controller");
const router = Router();

router.get("/mapData", getMapData);

module.exports = router;
