require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const Database = require("better-sqlite3");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

const SECRET_KEY = process.env.SECRET_KEY;

if (!fs.existsSync("/tmp")) {
    fs.mkdirSync("/tmp");
}

const dbPath = path.join("/tmp", "users.db");
const db = new Database(dbPath);

db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE,
        password TEXT
    )
`).run();


app.post("/api/register", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields required" });
    }

    try {
        const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        db.prepare(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)"
        ).run(name, email, hashedPassword);

        res.json({ message: "User registered successfully" });

    } catch (err) {
        res.status(500).json({ message: "Database error" });
    }
});


app.post("/api/login", async (req, res) => {
    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(400).json({ message: "All fields required" });
    }

    try {
        const user = db.prepare("SELECT * FROM users WHERE name = ?").get(name);

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            {
                id: user.id,
                name: user.name,
                email: user.email
            },
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 3600000
        });

        res.json({ message: "Login Successfully" });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});


app.post("/api/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    });

    res.json({ message: "Logout Successfully" });
});


const authenticationToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid User" });
        }

        req.user = user;
        next();
    });
};


app.get("/api/me", authenticationToken, (req, res) => {
    res.json({
        username: req.user.name,
        email: req.user.email
    });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});