import mysql from "mysql2"
import inquirer from "inquirer";

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: '',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 6000,
    queueLimit: 0
})

let { } = await inquirer.prompt({
    

})

    const promisePool = pool.promise();

        const [rows,fields] = await promisePool.query("SELECT * FROM ")

        console.table(rows)