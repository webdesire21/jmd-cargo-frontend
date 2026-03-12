const express = require("express");
const { loginAdmin } = require("../controllers/adminController");

const router = express.Router();

router.post("/login", loginAdmin);

router.get("/test", (req, res) => {
  res.json({ message: "Admin route working" });
});

module.exports = router;
