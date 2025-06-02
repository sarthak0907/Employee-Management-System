function calculateTax(salary) {
 if (salary <= 300000) return salary * 0.05;
 if (salary <= 600000) return salary * 0.10;
 return salary * 0.20;
}

module.exports = { calculateTax };