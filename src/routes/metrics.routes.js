const express = require("express");
const router = express.Router();

const metricsController = require("../controllers/metrics.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/overview", authMiddleware, metricsController.getOverview);
router.get("/by-region", authMiddleware, metricsController.getByRegion);
router.get("/by-age-group", authMiddleware, metricsController.getByAgeGroup);
router.get("/time-series", authMiddleware, metricsController.getTimeSeries);
router.get("/by-gender", authMiddleware, metricsController.getByGender);


module.exports = router;
