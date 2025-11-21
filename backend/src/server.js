import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";


app.use(cors({
  origin: ENV.CLIENT_URL,
  credentials: true
}));
app.use(cookieParser());

// Resolve current file/dir for robust pathing regardless of cwd
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = ENV.PORT || 3000;
//middleware to parse json bodies in requests
app.use(express.json({ limit: "5mb"}));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

//check if the production ready add the path for static frontend assets
if (ENV.NODE_ENV === "production") {
  const frontendDir = path.resolve(__dirname, "../../frontend/dist");
  app.use(express.static(frontendDir));
  // SPA fallback for non-API routes
  app.get("*", (req, res) => {
    if (req.path.startsWith("/api")) return res.status(404).end();
    res.sendFile(path.join(frontendDir, "index.html"));
  });
}

server.listen(PORT, () => {
    console.log("Server running on port: " + PORT)
    connectDB();
});
