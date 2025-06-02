# Employee Management System (CLI-Based in Node.js)

A simple, secure, and interactive **command-line application** to manage employee records using Node.js. The system supports **role-based access** for Admins and Employees, with local **JSON file storage**—no database needed.

---
## Dependencies

- Node.js
- `bcrypt` — for password hashing (npm install bcrypt)
- Native `fs` and `readline` modules

--- 

## How to Run

1. **Clone the repository:**
 ```bash
 git clone https://github.com/sarthak0907/Employee-Management-System.git
 ```

2. **Ensure the following files exist inside `employee-management/data/`:**
 - `users.json`
 - `employees.json`


3. **By Default Admin User**
 - by default username- admin
 - by default password- admin


4. **Run the application:**
 ```bash
 cd employee-management
 node index.js
 ```

5. **Login:**
 - Use `id` and `password` of any user (admin or employee)

---

## Features

### Common

- **Interactive CLI** with `readline`
- **Secure login** with hashed passwords (`bcrypt`)
- **Role-based access** (`admin` vs `employee`)
- **Local JSON-based storage**
- **Validation**:
 - Prevents alphabetic input for salary
 - Employee ID, name, and department cannot be blank

---

### Admin Features

- Login with Admin ID and Password
- **Add Employee**
 - Auto-generates login credentials (default password ("1234"))
 - Tax is auto-calculated on salary
- **Update Employee** (Department / Salary)
- **Delete Employee**
 - Removes from both employee records and users
- **List All Employees**

---

### Employee Features

- Login with Employee ID and Password
- **Change Own Password**
- **View Own Tax**
 - Displays salary and tax in a tabular format

---

## Tax Calculation

Tax is automatically calculated based on the following rules:

```js
if (salary < 500000) tax = 0;
else if (salary <= 1000000) tax = salary * 0.1;
else tax = salary * 0.2;
```

Tax is auto-applied during:
- Employee creation
- Salary update

---

## Directory Structure

```
employee-management/
├── data/
│ ├── users.json
│ └── employees.json
├── index.js
├── employee.js
├── utils.js
└── taxcalculator.js
```

---

## Security

- Passwords are securely hashed
- Role-based separation ensures users can only access permitted operations

---

## Notes

- Do **not** edit `users.json` or `employees.json` manually unless you know what you're doing.
- Ensure correct bcrypt hash if setting admin password manually.

---
