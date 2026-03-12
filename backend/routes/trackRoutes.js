const express = require("express");

const {
  trackConsignment,
} = require("../controllers/trackController");

const router = express.Router();

router.get("/:trackingId", trackConsignment);

router.get("/test", (req, res) => {
  res.json({ message: "Track route working" });
});

module.exports = router;
