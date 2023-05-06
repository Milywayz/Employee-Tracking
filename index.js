import mysql from "mysql2"
import inquirer from "inquirer";

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: "rootroot",
    database: '',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 6000,
    queueLimit: 0
})


const promisePool = pool.promise();

findEmployee();

async function findEmployee(){


    let { } = await inquirer.prompt({
        
    
    })
    
    
            const [rows,fields] = await promisePool.query("SELECT * FROM ")
    
            console.table(rows)


}