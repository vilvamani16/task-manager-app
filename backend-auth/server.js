const express = require("express")
const cors = require("cors")
const sqlite3 = require("sqlite3").verbose()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")

const app = express()
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

const db = new sqlite3.Database("users.db")

const SECRET_KEY = "mysecretkey"

db.run(`
        CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT UNIQUE,
            password TEXT
        )
    `)

app.post("/api/register", async(req, res)=>{
    const {name, email, password} = req.body

    if(!name || !email || !password){
        return res.status(400).json({message : "All fields required"})
    }

    db.get("SELECT * FROM users WHERE email = ?", [email], async(err, user) => {
        if(user){
            return res.status(400).json({message: "User already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        db.run(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [name, email, hashedPassword],
            function (err) {
                if (err) {
                    return res.status(500).json({ message: "Database error" });
                }

                res.json({ message: "User registered successfully" });
            }
        );
    })
})

app.post("/api/login", (req, res) => {
    const {name, password} = req.body
    if(!name || !password){
        return res.status(400).json({message: "All field required"})
    }

    db.get("SELECT * FROM users WHERE name = ?", [name], async(err, user)=>{
        
        if(err){
            return res.status(400).json({message : "Database Error"})
        }

        if(!user){
            return res.status(400).json({message: "User not found"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({message: "Invalid Password"})
        }

        const token = jwt.sign(
            {
                id: user.id,
                name: user.name
            },
            SECRET_KEY,
            {
                expiresIn: "1h"
            }
        )

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 3600000
        })

        res.json({
            message: "Login Successfully"
        })
    })
})

app.post("/api/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    })

    res.json({
        message: "Logout Successfully"
    })
})

const authenticationToken = (req, res, next) => {
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({message: "Unauthorized"})
    }

    jwt.verify(token, SECRET_KEY, (err, user) =>{
        if(err){
            return res.status(401).json({message: "Invalid User"})
        }
        req.user = user
        next()
    })
}

app.get("/api/me",authenticationToken, (req, res)=>{
    res.json({
            username: req.user.name,
            email: req.user.email
        })
})

const port = 5000

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})