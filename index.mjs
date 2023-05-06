import mysql from "mysql2"
import inquirer from "inquirer";


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: "rootroot",
    database: 'employment_db',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 6000,
    queueLimit: 0
})

const promisePool = pool.promise();
start();

async function start() {
    const initialPrompt = await inquirer
        .prompt([
            {
                type: 'list',
                name: 'Employee Manager',
                message: '',
                choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', "Add A Role", "Add A Employee", 'Add a Manager', 'Update An Employee Role'],

            },
        ])
        switch (initialPrompt['Employee Manager']) {
        
            case 'View All Departments':
                viewAllDepartments();
                break;
                case 'View All Roles':
                ViewAllRoles();
                break;
                case 'View All Employees':
                viewAllEmployees();
                break;
                case 'Add A Department':
                AddADepartment();
                break;
                case 'Add A Role':
                AddARole();
                break;
                case 'Add A Employee':
                AddAEmployee();
                break;
                case 'Add a Manager':
                AddAManager();
                break;
                case 'Update An Employee Role':
                UpdateAnEmployeeRole();
                break;
            default:
                break;
        }
}

async function viewAllDepartments() {

    const [rows] = await promisePool.query("SELECT * FROM departments")

    if (rows.length === 0) {
        console.log("No departments to display.");
      } else {
        console.table(rows);
      }

}

async function ViewAllRoles() {

    const [rows] = await promisePool.query("SELECT * FROM roles")

    if (rows.length === 0) {
        console.log("No roles to display.");
      } else {
        console.table(rows);
      }

}

async function viewAllEmployees() {

    const [rows] = await promisePool.query("SELECT * FROM employee JOIN roles ON employee.roles = roles.id")

    if (rows.length === 0) {
        console.log("No employee to display.");
      } else {
        console.table(rows);
      }

}