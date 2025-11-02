import express from "express";

const app = express();

app.get("/api/auth/signup", (req, res) => {
    res.send("Signup route");
})

app.get("/api/auth/login", (req, res) => {
    res.send("Login route");
})

app.get("/api/auth/logout", (req, res) => {
    res.send("Logout route");
})

app.listen(3000, () => console.log("Server running on port 3000"));