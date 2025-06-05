# Employee Management System (Node.js + Express + JWT)

A RESTful **Employee Management System** built using **Node.js**, **Express**, and **JWT authentication**, supporting secure **role-based access** for **Admins** and **Employees**. It uses local **JSON file storage**—no database required.

---

## Features

### Authentication & Authorization
- Secure **JWT login** for both Admins and Employees
- **Role-based access control**:
 - Admin: Full control (CRUD operations)
 - Employee: Can view tax & change password

###  Admin APIs
- Add Employee (with tax auto-calculated)
- Update Employee (department/salary)
- Delete Employee
- List all Employees

###  Employee APIs
- View own tax details
- Change own password

---

##  Tech Stack

- Node.js + Express
- JSON file system for data storage
- `bcrypt` for password hashing
- `jsonwebtoken` for secure authentication

---

##  Directory Structure

```
employee-management/
├── data/
│ ├── users.json
│ └── employees.json
├── controllers/
│ └── employeeController.js
├── middleware/
│ └── auth.js
├── routes/
│ └── employeeRoutes.js
├── utils.js
├── employee.js
├── taxcalculator.js
└── server.js
```

---

##  Getting Started

### 1. Clone the repository

```bash
git clone <repo-url>
cd employee-management
```

### 2. Install dependencies

```bash
npm install
```

### 3. Prepare data files

Ensure the following files exist in the `/data` directory:

```bash
data/
├── users.json
└── employees.json
```



### 4. Start the server

```bash
node server.js
```

Server will run on `http://localhost:3000`

---

##  Authentication Flow

1. **Login** (POST `/login`) 
 → Returns JWT token and role
 
2. **Default Admin User** :

- default username- admin
- default password- admin

3. **Use token in Authorization header** 
 Example: 
 `Authorization: Bearer <your-token>`

---

##  API Endpoints

### Public

- `POST /login` 
 Login with `id` and `password`

###  Admin (require admin JWT)

- `GET /employees` — List all employees 
- `POST /employees` — Add new employee 
- `PUT /employees/:id` — Update employee 
- `DELETE /employees/:id` — Delete employee 

###  Employee (require employee JWT)

- `GET /my-tax` — View own tax 
- `POST /change-password` — Change own password

---

## Tax Calculation

```js
if (salary < 500000) tax = 0;
else if (salary <= 1000000) tax = salary * 0.1;
else tax = salary * 0.2;
```

Tax is applied automatically during:
- Employee creation
- Salary updates

---

##  Security Notes

- All passwords are hashed using **bcrypt**
- JWT tokens expire in **1 hour**
- Role-based route protection via middleware

---

##  Sample cURL Requests

Replace `<TOKEN>` with the actual JWT token.

```bash
# Login
curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d '{"id":"admin","password":"admin"}'

# Add employee
curl -X POST http://localhost:3000/employees -H "Authorization: Bearer <TOKEN>" -H "Content-Type: application/json" -d '{"id":"emp101","name":"Sarthak","department":"CSL","salary":600000}'

# List employees
curl -X GET http://localhost:3000/employees -H "Authorization: Bearer <TOKEN>" -H "Content-Type: application/json"

# Update employee
curl -X PUT http://localhost:3000/employees/emp101 -H "Authorization: Bearer <TOKEN>" -H "Content-Type: application/json" -d '{"department":"Finance","salary":700000}'

# Delete employee
curl -X DELETE http://localhost:3000/employees/emp101 -H "Authorization: Bearer <TOKEN>" -H "Content-Type: application/json"

# View own tax
curl -X GET http://localhost:3000/my-tax -H "Authorization: Bearer <TOKEN>" -H "Content-Type: application/json"

# Change password
curl -X POST http://localhost:3000/change-password -H "Authorization: Bearer <TOKEN>" -H "Content-Type: application/json" -d '{"newPassword":"new123"}'
```

---

##  Tips

- Avoid editing `users.json` or `employees.json` manually
- Use tools like Postman or curl for testing

---