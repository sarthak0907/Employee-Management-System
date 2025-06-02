const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const { readJSON, writeJSON } = require("./utils");
const { calculateTax } = require("./taxCalculator");

const employeeFile = path.join(__dirname, "data/employees.json");
const userFile = path.join(__dirname, "data/users.json");

function addEmployee(id, name, dept, salary) {
 const employees = readJSON(employeeFile);
 const users = readJSON(userFile);

 if (employees.some(e => e.id === id)) {
 throw new Error("Employee ID already exists.");
 }

 if (id==="" || dept==="" || name==="") {
 throw new Error("ID, Name, Department cant be Empty.");
 }

 const tax = calculateTax(salary);
 employees.push({ id, name, department: dept, salary, tax });

 users.push({ id, password: bcrypt.hashSync("1234", 10), role: "employee" });

 writeJSON(employeeFile, employees);
 writeJSON(userFile, users);
}

function listEmployees() {
 const employees = readJSON(employeeFile);
 console.table(employees);
}

function updateEmployee(id, newDept, newSalary) {
 const employees = readJSON(employeeFile);
 const index = employees.findIndex(e => e.id === id);
 if (index === -1) {
 console.log("Employee not found.");
 return;
 }

 if (newDept) employees[index].department = newDept;
 if (newSalary !== undefined) {
 employees[index].salary = newSalary;
 employees[index].tax = calculateTax(newSalary); // ✅ use calculator
 }

 writeJSON(employeeFile, employees);
 console.log("Employee updated.");
}

function deleteEmployee(id) {
 let employees = readJSON(employeeFile);
 let users = readJSON(userFile);

 employees = employees.filter(e => e.id !== id);
 users = users.filter(u => u.id !== id);

 writeJSON(employeeFile, employees);
 writeJSON(userFile, users);
 console.log("Employee deleted.");
}

async function changePassword(id, newPassword) {
 const users = readJSON(userFile);
 const index = users.findIndex(u => u.id === id);
 if (index === -1) {
 console.log("User not found.");
 return;
 }

 users[index].password = await bcrypt.hash(newPassword, 10);
 writeJSON(userFile, users);
}

function viewMyTax(id) {
 const employees = readJSON(employeeFile);
 const emp = employees.find(e => e.id === id);
 if (!emp) {
 console.log("Employee not found.");
 return;
 }

 const table = [{
 ID: emp.id,
 Name: emp.name,
 Department: emp.department,
 Salary: `₹${emp.salary.toFixed(2)}`,
 Tax: `₹${emp.tax.toFixed(2)}`
 }];

 console.table(table);
}


module.exports = {
 addEmployee,
 listEmployees,
 updateEmployee,
 deleteEmployee,
 changePassword,
 viewMyTax,
};