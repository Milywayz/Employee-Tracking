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
                message: 'What would you like to do?',
                choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', "Add A Role", "Add A Employee", 'Update An Employee Role', 'Update A Manager Role', 'Exit'],

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
        case 'Update An Employee Role':
            UpdateAnEmployeeRole();
            break;
            case 'Update A Manager Role':
            UpdateAManager();
            break;
        case 'Exit':
            console.log('Exiting now...');
            process.exit(); 
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

    }
    start()
}

async function ViewAllRoles() {

    const [rows] = await promisePool.query("SELECT roles.id, roles.title, departments.department_name, roles.salary FROM roles JOIN departments ON roles.department_id = departments.id;")

    if (rows.length === 0) {
        console.log("No roles to display.");
    } else {
        console.table(rows)
        start()
    }

}

async function viewAllEmployees() {

    const [rows] = await promisePool.query('SELECT e.id AS employee_id, e.first_name AS employee_first_name, e.last_name AS employee_last_name, r.title, d.department_name, r.salary, CONCAT(m.first_name, " ", m.last_name) AS manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id LEFT JOIN roles r ON e.role_id = r.id LEFT JOIN departments d ON r.department_id = d.id;')

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

        }
    })
    start()

}
async function AddARole() {

    const [rowS] = await promisePool.query("SELECT id, department_name FROM departments");
    const departments = rowS.map(row => ({ name: row.department_name, value: row.id }));

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

        }

    })
    start()

}

async function AddAEmployee() {
    const [rolesResult, managersResult] = await Promise.all([
        promisePool.query("SELECT id, title FROM roles"),
        promisePool.query("SELECT id, CONCAT(first_name, ' ', last_name) AS manager_name FROM employee")
    ]);

    const employees = rolesResult[0].map(row => ({ name: row.title, value: row.id }));
    const managers = managersResult[0].map(row => ({ name: row.manager_name, value: row.id }));


    let { firstName, lastName, role, manager } = await inquirer.prompt([
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
            name: 'role',
            message: 'What is the role of the employee?',
            choices: [...employees]
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Select the employees manager?',
            choices: [{ name: "None", value: null }, ...managers]
        }
    ])

    const [rows] = await promisePool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, role, manager], function (err, results) {
        if (rows.length === 0) {
            console.log("Can't enter in that employee");
        } else {
            console.table(rows)

        }

    })
    start()
}

async function UpdateAnEmployeeRole() {
    const [rolesResult, employeesResult] = await Promise.all([
        promisePool.query("SELECT id, title FROM roles"),
        promisePool.query("SELECT id, CONCAT(first_name, ' ', last_name) AS employee_name FROM employee")
    ]);

    const roles = rolesResult[0].map(row => ({ name: row.title, value: row.id }));
    const employees = employeesResult[0].map(row => ({ name: row.employee_name, value: row.id }));

    let { employeeName, role } = await inquirer.prompt([
        {
            type: 'list',
            name: 'employeeName',
            message: 'Select the employee you would like to update:',
            choices: [...employees]
        },
        {
            type: 'list',
            name: 'role',
            message: 'Select the new role for the employee:',
            choices: [...roles]
        }
    ]);


    const [rows] = await promisePool.query('UPDATE employee SET role_id = ? WHERE id = ?', [role, employeeName], function (err, results) {
        if (rows.length === 0) {
            console.log("Can't enter in that employee");
        } else {
            console.table(rows)

        }

    })
    start()
}

async function UpdateAManager() {
    const [managersResult, employeesResult] = await Promise.all([
        promisePool.query("SELECT id, CONCAT(first_name, ' ', last_name) AS manager_name FROM employee"),
        promisePool.query("SELECT id, CONCAT(first_name, ' ', last_name) AS employee_name FROM employee")
    ]);

    const managers = managersResult[0].map(row => ({ name: row.manager_name, value: row.id }));
    const employees = employeesResult[0].map(row => ({ name: row.employee_name, value: row.id }));

    let { employeeName, role } = await inquirer.prompt([
        {
            type: 'list',
            name: 'employeeName',
            message: 'Select the employee you would like to update:',
            choices: [...employees]
        },
        {
            type: 'list',
            name: 'role',
            message: 'Do you want them to become a manager or give them a new manager?',
            choices: [{ name: "Become A Manager", value: null }, ...managers]
        }
    ]);


    const [rows] = await promisePool.query('UPDATE employee SET manager_id = ? WHERE id = ?', [role, employeeName], function (err, results) {
        if (rows.length === 0) {
            console.log("Can't enter in that employee");
        } else {
            console.table(rows)

        }

    })
    start()
}