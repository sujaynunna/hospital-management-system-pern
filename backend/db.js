const { Pool } = require("pg");

// console.log(process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect().then((v) => {
  console.log("Successfully, connected to database!");
}).catch((e) => {
  console.error(`Failed to connect to database. Error: ${e}`);
});

module.exports = pool;
