const express = require("express");

const router = express.Router();

const {
  createConsignment,
  getAllConsignments,
  updateConsignment,
  updateStatus,
  deleteConsignment
} = require("../controllers/consignmentController");

// Create
router.post("/create", createConsignment);

// Get all
router.get("/all", getAllConsignments);

// Update full consignment
router.put("/:id", updateConsignment);

// Update status
router.put("/:id/status", updateStatus);

// Delete consignment  ← IMPORTANT
router.delete("/:id", deleteConsignment);

module.exports = router;
