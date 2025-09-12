import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const users = []; // TODO: Replace with Postgres

export const register = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password required" });
    }

    const existing = users.find(u => u.email === email);
    if (existing) return res.status(400).json({ error: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = { email, password: hashed };
    users.push(newUser);

    res.status(201).json({ message: "User registered" });
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (!user) return res.status(400).json({ error: "No account with this email" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ email }, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });
    res.json({ token });
};