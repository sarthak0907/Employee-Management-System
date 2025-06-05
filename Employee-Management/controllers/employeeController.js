//File: controllers/employeeController.js
const bcrypt = require("bcrypt");
const path = require("path");
const jwt = require("jsonwebtoken");
const { readJSON, writeJSON } = require("../utils");
const {
 addEmployee: addEmpLogic,
 listEmployees: listEmpLogic,
 updateEmployee: updateEmpLogic,
 deleteEmployee: deleteEmpLogic,
 changePassword: changePassLogic,
 viewMyTax: viewTaxLogic
} = require("../employee");
const { SECRET } = require("../middleware/auth");

const userFile = path.join(__dirname, "../data/users.json");
const employeeFile = path.join(__dirname, "../data/employees.json");

exports.login = async (req, res) => {
 console.log("trying to log in");
 const { id, password } = req.body;
 const users = readJSON(userFile);
 const user = users.find(u => u.id === id);
 if (!user) return res.status(401).json({ message: "Invalid credentials" });

 const match = await bcrypt.compare(password, user.password);
 if (!match) return res.status(401).json({ message: "Invalid credentials" });

 const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: "1h" });

 res.json({
 message: `Logged in as ${user.role}`,
 role: user.role,
 token
 });
};

exports.addEmployee = (req, res) => {
 const { id, name, department, salary } = req.body;
 try {
 addEmpLogic(id, name, department, parseFloat(salary));
 res.status(201).json({ message: "Employee added successfully." });
 } catch (err) {
 res.status(400).json({ error: err.message });
 }
};

exports.listEmployees = (req, res) => {
 try {
 const data = readJSON(employeeFile);
 res.json(data);
 } catch (err) {
 res.status(500).json({ error: err.message });
 }
};

exports.updateEmployee = (req, res) => {
 const id = req.params.id;
 const { department, salary } = req.body;
 try {
 updateEmpLogic(id, department || undefined, salary ? parseFloat(salary) : undefined);
 res.json({ message: "Employee updated." });
 } catch (err) {
 res.status(400).json({ error: err.message });
 }
};

exports.deleteEmployee = (req, res) => {
 const id = req.params.id;
 try {
 deleteEmpLogic(id);
 res.json({ message: "Employee deleted." });
 } catch (err) {
 res.status(400).json({ error: err.message });
 }
};

exports.changePassword = async (req, res) => {
 const id = req.user.id; // ✅ Use ID from token, not URL param
 const { newPassword } = req.body;
 try {
 await changePassLogic(id, newPassword);
 res.json({ message: "Password updated successfully." });
 } catch (err) {
 res.status(400).json({ error: err.message });
 }
};


exports.viewMyTax = (req, res) => {
 const id = req.user.id; // ← ✅ Correct way to get logged-in user's ID
 try {
 const data = readJSON(employeeFile);
 const emp = data.find(e => e.id === id);
 if (!emp) return res.status(404).json({ message: "Employee not found." });

 res.json({
 id: emp.id,
 name: emp.name,
 department: emp.department,
 salary: emp.salary,
 tax: emp.tax,
 });
 } catch (err) {
 res.status(500).json({ error: err.message });
 }
};

