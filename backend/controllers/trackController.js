const Consignment = require("../models/Consignment");

/**
 * @desc Public tracking
 * @route GET /api/track/:trackingId
 */
exports.trackConsignment = async (req, res) => {
  try {
    const { trackingId } = req.params;

    const consignment = await Consignment.findOne({ trackingId });

    if (!consignment) {
      return res.status(404).json({
        success: false,
        message: "Tracking ID not found",
      });
    }

    if (consignment.status === "Inactive") {
      return res.status(403).json({
        success: false,
        message: "Tracking ID is inactive",
      });
    }

    res.json({
      success: true,
      consignment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
