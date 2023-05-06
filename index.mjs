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
    
    const [rows] = await promisePool.query(`SELECT e.id, e.first_name, e.last_name, r.title, d.department_name, r.salary, CONCAT(e.first_name, ' ', e.last_name) AS manager_name
    FROM employee AS e
    JOIN roles AS r ON e.role_id = r.id
    JOIN departments AS d ON r.department_id = d.id;`)
    
    if (rows.length === 0) {
        console.log("No employee to display.");
    } else {
        console.table(rows);
    }
    
}

async function AddADepartment() {

    let { departmentName } = await inquirer.prompt([
     {
         type: 'input',
         name: 'departmentName',
         message: 'What is the name of the department?',
     }
    ])
    
    const [rows] = await promisePool.query('INSERT INTO departments (department_name) VALUES (?)', departmentName, function (err, results) {
     if (rows.length === 0) {
         console.log("Can't enter in that department");
     } else {
         console.table(rows);
     }
 
    })
 

 }
async function AddARole() {
    
    let { title, salary, departmentId} = await inquirer.prompt([
        {
        type: 'input',
        name: 'title',
        message: 'What is the title of the role?',
    },
    {
        type: 'input',
        name: 'salary',
        message: 'What is the salary of the role?',
    },
    {
        type: 'input',
        name: 'departmentId',
        message: 'What is the departmentId of the role? (please use an existing departmentID)',
    }
   ])

   const [rows] = await promisePool.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId], function (err, results) {
    if (rows.length === 0) {
        console.log("Please make sure you put in an departmentId that already exist");
    } else {
        console.table(rows);
    }

   })

}
