const authService = require('../services/auth.service.js');

exports.login = async (req, res) => {
    const {user, password} = req.body;
    try{
        const token = await authService.login(user, password);
        res.json({token})
    }catch (error) {
        if (error.message === "DB_ERROR") {
            return res.status(500).json({ message: "Internal server error" });
        }
        return res.status(401).json({ message: "Invalid user or password" });
    }
}