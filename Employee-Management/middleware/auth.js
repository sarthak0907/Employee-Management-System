// File: auth.js
const jwt = require("jsonwebtoken");
const SECRET = "your-secret-key"; // Use dotenv in production

function authenticate(req, res, next) {
 const token = req.headers.authorization?.split(" ")[1];
 if (!token) return res.status(401).json({ error: "No token provided" });

 try {
 const decoded = jwt.verify(token, SECRET);
 req.user = decoded;
 next();
 } catch {
 res.status(401).json({ error: "Invalid token" });
 }
}

function authorize(role) {
 return (req, res, next) => {
 if (req.user.role !== role) {
 return res.status(403).json({ error: "Forbidden: Insufficient role" });
 }
 next();
 };
}

module.exports = { authenticate, authorize, SECRET };

