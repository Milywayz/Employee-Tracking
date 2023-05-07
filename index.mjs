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
        console.table(rows)
        start()
    }

}

async function ViewAllRoles() {

    const [rows] = await promisePool.query("SELECT * FROM roles")

    if (rows.length === 0) {
        console.log("No roles to display.");
    } else {
        console.table(rows)
        start()
    }

}

async function viewAllEmployees() {

    const [rows] = await promisePool.query(`SELECT e.id AS employee_id, e.first_name AS employee_first_name, e.last_name AS employee_last_name,
    r.title, d.department_name, r.salary,
    CONCAT(m.first_name, ' ', m.last_name) AS manager
FROM employee e
LEFT JOIN employee m ON e.manager_id = m.id
LEFT JOIN roles r ON e.role_id = r.id
LEFT JOIN departments d ON r.department_id = d.id;`)

    if (rows.length === 0) {
        console.log("No employee to display.");
    } else {
        console.table(rows)
        start()
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
            console.table(rows)
            start()
        }

    })


}
async function AddARole() {
    const [rowS] = await promisePool.query("SELECT department_name FROM departments")
    const departments = rowS.map(row => row.department_name);

    let { title, salary, departmentId } = await inquirer.prompt([
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
            type: 'list',
            name: 'departmentId',
            message: 'What is the departmentId of the role?',
            choices: [...departments]
        }
    ])

    const [rows] = await promisePool.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId], function (err, results) {
        if (rows.length === 0) {
            console.log("Please make sure you put in an departmentId that already exist");
        } else {
            console.table(rows)
            start()
        }

    })

}

async function AddAEmployee() {
    const [rowS] = await promisePool.query("SELECT role_id FROM employee")
    const employees = rowS.map(row => row.role_id);

    let { firstName, lastName, roleId } = await inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the first name of the employee?',
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the last name of the employee?',
        },
        {
            type: 'list',
            name: 'roleId',
            message: 'What is the role ID of the employee?',
            choices: [...employees]
        }
    ])

    const [rows] = await promisePool.query('INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)', [firstName, lastName, roleId], function (err, results) {
        if (rows.length === 0) {
            console.log("Can't enter in that employee");
        } else {
            console.table(rows)
            start()
        }

    })

}

async function AddAManager() {
    const [rowS] = await promisePool.query("SELECT role_id FROM employee")
    const employees = rowS.map(row => row.role_id);

    const [rowSs] = await promisePool.query("SELECT manager_id FROM employee")
    const managers = rowSs.map(row => row.manager_id);

    let { firstName, lastName, roleId, managerId } = await inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the first name of the employee?',
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the last name of the employee?',
        },
         {
            type: 'list',
            name: 'roleId',
            message: 'What is the role ID of the employee?',
            choices: [...employees]
        },
        {
            type: 'list',
            name: 'managerId',
            message: 'What is the role ID of the employee?',
            choices: [...managers]
        }
    ])

    const [rows] = await promisePool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId], function (err, results) {
        if (rows.length === 0) {
            console.log("Can't enter in that manager employee");
        } else {
            console.table(rows)
            start()
        }

    })

}

async function UpdateAnEmployeeRole() {

    let { firstName, lastName, roleId } = await inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the first name of the employee?',
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the last name of the employee?',
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'What is the role ID of the employee? (please use an existing roleID)',
        }
    ])

    const [rows] = await promisePool.query('UPDATE employee SET  (first_name, last_name, role_id) VALUES (?, ?, ?)', [firstName, lastName, roleId], function (err, results) {
        if (rows.length === 0) {
            console.log("Can't enter in that employee");
        } else {
            console.table(rows)
            start()
        }

    })

}