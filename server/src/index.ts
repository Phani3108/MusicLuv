import express from "express";
import cors from "cors";
import { registerRoutes } from "./httpRoutes.js";

const app = express();

app.use(
  cors({
    origin: (process.env.CORS_ORIGINS || "http://localhost:5173").split(","),
    credentials: false,
  })
);
app.use(express.json({ limit: "4mb" }));

registerRoutes(app);

// 404 fallthrough
app.use((req, res) => res.status(404).json({ ok: false, error: "not_found", path: req.path }));

const PORT = Number(process.env.PORT || 8000);
app.listen(PORT, "0.0.0.0", () => {
  console.log(`[musicluv-server] listening on http://0.0.0.0:${PORT}`);
});
