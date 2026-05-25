const authService = require('../services/auth.service.js');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const token = await authService.register(name, email, password);
        return res.status(201).json({ token });

    } catch (error) {

        if (error.message === 'USER_EXISTS') {
            return res.status(409).json({ message: 'User already exists' });
        }

        if (error.message === 'DB_ERROR') {
            return res.status(500).json({ message: 'Internal server error' });
        }

        return res.status(500).json({ message: 'Unexpected error' });
    }
};

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