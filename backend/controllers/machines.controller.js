const machinesService = require('../services/machines.service');

exports.createMachine = async (req, res) => {
    try {
        const data = req.body;

        const machineId = await machinesService.createMachine(data);

        return res.status(201).json({
            message: "Machine saved successfully",
            machineId
        });

    } catch (error) {

        console.error("CONTROLLER ERROR:", error);

        return res.status(500).json({
            message: "DB_ERROR"
        });
    }
};