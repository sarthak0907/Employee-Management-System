// File: server.js
const express = require("express");
const app = express();
const employeeRoutes = require("./routes/employeeRoutes");

app.use(express.json());
console.log("request received")
app.use("/", employeeRoutes);

app.listen(3000, () => {
 console.log("Server running on http://localhost:3000");
});