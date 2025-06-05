//File: routes/employeeRoutes.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/employeeController");
const { authenticate, authorize } = require("../middleware/auth");

// Public login route
console.log("req rec")
router.post("/login", controller.login);

// Protected routes (admin only)
router.post("/employees", authenticate, authorize("admin"), controller.addEmployee);
router.get("/employees", authenticate, authorize("admin"), controller.listEmployees);
router.put("/employees/:id", authenticate, authorize("admin"), controller.updateEmployee);
router.delete("/employees/:id", authenticate, authorize("admin"), controller.deleteEmployee);

// Protected routes (employee only)
router.post("/change-password", authenticate, authorize("employee"), controller.changePassword);
router.get("/my-tax", authenticate, authorize("employee"), controller.viewMyTax);

module.exports = router;