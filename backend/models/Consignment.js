const mongoose = require("mongoose");

const consignmentSchema = new mongoose.Schema(
  {
    trackingId: {
      type: String,
      required: true,
      unique: true,
    },

    customerName: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    origin: {
      type: String,
      required: true,
    },

    destination: {
      type: String,
      required: true,
    },

    courierCompany: {
      type: String,
      required: true,
    },

    courierLink: {
      type: String,
      required: true,
    },

    shipmentDate: {
      type: Date,
      required: true,
    },

    expectedDeliveryDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Consignment", consignmentSchema);
