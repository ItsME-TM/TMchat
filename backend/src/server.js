import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./lib/db.js";

dotenv.config();
const app = express();

// Resolve current file/dir for robust pathing regardless of cwd
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

//check if the production ready add the path for static frontend assets
if (process.env.NODE_ENV === "production") {
  const frontendDir = path.resolve(__dirname, "../../frontend/dist");
  app.use(express.static(frontendDir));
  // SPA fallback for non-API routes
  app.get("*", (req, res) => {
    if (req.path.startsWith("/api")) return res.status(404).end();
    res.sendFile(path.join(frontendDir, "index.html"));
  });
}

app.listen(PORT, () => {
    console.log("Server running on port: " + PORT)
    connectDB();
});
