// import mysql from "mysql2"
// import inquirer from "inquirer";
const inquirer = require("inquirer")
const mysql = require("mysql2")


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

async function start() {
    const initialPrompt = await inquirer
        .prompt([
            {
                type: 'list',
                name: '',
                message: '',
                choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', "Add A Role", "Add A Employee", 'Add a Manager', 'Update An Employee Role'],

            },
        ])
        switch (initialPrompt) {
        
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

start();


async function findEmployee() {


    let { } = await inquirer.prompt({


    })


    const [rows, fields] = await promisePool.query("SELECT * FROM ")

    console.table(rows)


}