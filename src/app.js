// const express = require("express");
// const app = express();
// const metricsRoutes = require("./routes/metrics.routes");
// const authRoutes = require("./routes/auth.routes");

// app.use(express.json());

// // Routes
// app.use("/auth", authRoutes);
// app.use("/metrics", metricsRoutes);


// module.exports = app;

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://your-frontend.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());

app.use("/auth", require("./routes/auth.routes"));
app.use("/metrics", require("./routes/metrics.routes"));
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

module.exports = app;
