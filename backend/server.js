const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes.js');
/*const dashboardRoutes = require('./routes/dashboard.routes')*/
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());

app.use('/auth', authRoutes);
app.get("/", (req, res) => {
    res.json({ status: "API running" });
});
/*app.use('/dashboard', dashboardRoutes)*/

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});