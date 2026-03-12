const Consignment = require("../models/Consignment");
const { v4: uuidv4 } = require("uuid");

/**
 * @desc Create Consignment
 * @route POST /api/consignments/create
 */
exports.createConsignment = async (req, res) => {
    try {
        const {
            trackingId,
            customerName,
            phone,
            origin,
            destination,
            courierCompany,
            courierLink,
            shipmentDate,
            expectedDeliveryDate,
            status,
        } = req.body;

        if (
            !trackingId ||
            !customerName ||
            !phone ||
            !origin ||
            !destination ||
            !courierCompany ||
            !courierLink ||
            !shipmentDate ||
            !expectedDeliveryDate
        ) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const existing = await Consignment.findOne({ trackingId });

        if (existing) {
            return res.status(400).json({
                message: "Tracking ID already exists",
            });
        }

        const consignment = await Consignment.create({
            trackingId,
            customerName,
            phone,
            origin,
            destination,
            courierCompany,
            courierLink,
            shipmentDate,
            expectedDeliveryDate,
            status: status || "Active",
        });

        res.status(201).json({
            success: true,
            consignment,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

/**
 * @desc Get All Consignments
 * @route GET /api/consignments/all
 */
exports.getAllConsignments = async (req, res) => {
    try {
        const consignments = await Consignment.find().sort({
            createdAt: -1,
        });

        res.json({
            success: true,
            count: consignments.length,
            consignments,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

/**
 * @desc Update Consignment
 * @route PUT /api/consignments/:id
 */
exports.updateConsignment = async (req, res) => {
    try {
        // const consignment = await Consignment.findByIdAndUpdate(
        //   req.params.id,
        //   req.body,
        //   { new: true }
        // );
        const consignment = await Consignment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { returnDocument: "after" }
        );


        if (!consignment) {
            return res.status(404).json({
                message: "Consignment not found",
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

/**
 * @desc Update Status (Active / Inactive)
 * @route PUT /api/consignments/:id/status
 */
exports.updateStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                message: "Status required",
            });
        }

        // const consignment = await Consignment.findByIdAndUpdate(
        //     req.params.id,
        //     { status },
        //     { new: true }
        // );
        const consignment = await Consignment.findByIdAndUpdate(
            req.params.id,
            { status },
            { returnDocument: "after" }
        );


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



/**
 * @desc Delete Consignment
 * @route DELETE /api/consignments/:id
 */
exports.deleteConsignment = async (req, res) => {

    try {

        const consignment =
            await Consignment.findByIdAndDelete(
                req.params.id
            );

        if (!consignment) {
            return res.status(404).json({
                success: false,
                message: "Consignment not found"
            });
        }

        res.json({
            success: true,
            message: "Consignment deleted"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
