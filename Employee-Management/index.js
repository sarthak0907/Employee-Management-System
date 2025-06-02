const readline = require("readline");
const bcrypt = require("bcrypt");
const path = require("path");
const { readJSON, writeJSON } = require("./utils");
const {
 addEmployee,
 listEmployees,
 updateEmployee,
 deleteEmployee,
 changePassword,
 viewMyTax,
} = require("./employee");

const rl = readline.createInterface({
 input: process.stdin,
 output: process.stdout,
});

// Login Function
function login() {
 rl.question("User ID: ", (idInput) => {
 rl.question("Password: ", async (passInput) => {
 try {
 const users = readJSON(path.join(__dirname, "data/users.json"));
 const user = users.find((u) => u.id === idInput.trim());

 if (!user) {
 console.log("Invalid credentials");
 rl.close();
 return;
 }

 const match = await bcrypt.compare(passInput, user.password);
 if (!match) {
 console.log("Invalid credentials");
 rl.close();
 return;
 }

 console.log(`\nLogged in as ${user.role.toUpperCase()}`);
 user.role === "admin" ? adminMenu() : employeeMenu(user.id);

 } catch (err) {
 console.error("Login error:", err.message);
 rl.close();
 }
 });
 });
}

// Admin Menu
function adminMenu() {
 console.log(`
======== Admin Menu ========
1. Add Employee
2. List Employees
3. Update Employee
4. Delete Employee
5. Exit`);

 rl.question("Select: ", (choice) => {
 switch (choice) {
 case "1":
 rl.question("New Emp ID: ", (id) => {
 rl.question("Name: ", (name) => {
 rl.question("Department: ", (dept) => {
 rl.question("Enter salary: ", async (salary) => {
 const salNum = parseFloat(salary);
 if (isNaN(salNum)) {
 console.log("Salary must be a valid number.");
 return adminMenu();
 }

 try {
 await addEmployee(id.trim(), name.trim(), dept.trim(), salNum);
 console.log("Employee added successfully.");
 } catch (err) {
 console.log("Error adding employee:", err.message);
 }
 adminMenu();
 });
 });
 });
 });
 break;

 case "2":
 listEmployees();
 adminMenu();
 break;

 case "3":
 rl.question("Emp ID to update: ", (id) => {
 rl.question("New Department (leave blank to skip): ", (dept) => {
 rl.question("New Salary (leave blank to skip): ", (sal) => {
 const newSal = sal ? parseFloat(sal) : undefined;
 if (sal && isNaN(newSal)) {
 console.log("Salary must be a valid number.");
 return adminMenu();
 }
 updateEmployee(id.trim(), dept || undefined, newSal);
 adminMenu();
 });
 });
 });
 break;

 case "4":
 rl.question("Emp ID to delete: ", (id) => {
 deleteEmployee(id.trim());
 adminMenu();
 });
 break;

 case "5":
 rl.close();
 break;

 default:
 console.log("Invalid option");
 adminMenu();
 }
 });
}
// 1. Update My Details
// Employee Menu
function employeeMenu(empId) {
 console.log(`
======== Employee Menu ========
1. Change My Password
2. View My Tax
3. Exit`);

 rl.question("Select: ", (choice) => {
 switch (choice) {
 // case "1":
 // rl.question("New Department (leave blank to skip): ", (dept) => {
 // rl.question("New Salary (leave blank to skip): ", (sal) => {
 // const newSal = sal ? parseFloat(sal) : undefined;
 // if (sal && isNaN(newSal)) {
 // console.log("Salary must be a valid number.");
 // return employeeMenu(empId);
 // }
 // updateEmployee(empId, dept || undefined, newSal);
 // employeeMenu(empId);
 // });
 // });
 // break;

 case "1":
 rl.question("Enter new password: ", async (newPass) => {
 await changePassword(empId, newPass);
 console.log("Password updated successfully.");
 employeeMenu(empId);
 });
 break;

 case "2":
 viewMyTax(empId);
 employeeMenu(empId);
 break;

 case "3":
 rl.close();
 break;

 default:
 console.log("Invalid option");
 employeeMenu(empId);
 }
 });
}

login();