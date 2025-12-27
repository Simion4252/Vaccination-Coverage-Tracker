const express = require("express");
const app = express();
const metricsRoutes = require("./routes/metrics.routes");
const authRoutes = require("./routes/auth.routes");

app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/metrics", metricsRoutes);


module.exports = app;

