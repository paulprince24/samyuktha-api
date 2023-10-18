var { Pool, Client } = require("pg");

if (process.env.APPENV == "development") {
  var options = {
    host: "localhost",
    port: 5432,
    database: "samyuktha",
    user: "postgres",
    password: "admin123",
  };
  var client = new Client(options);
  client.connect((err) => {
    if (err) {
      console.error("connection error", err.stack);
    } else {
      console.log("Postgres Development Connected");
    }
  });
} else {
    console.log("Production")
  var options = {
    host: "trim-coder-2422.7s5.cockroachlabs.cloud",
    port: 26257,
    database: "samyuktha2",
    user: "dedsec",
    password: "jUx0MyzOaGno6Qgtr9JvGA",
    ssl: true
  };
  var client = new Pool(options);
// var client = new Pool(process.env.DATABASE_URL)
  client.connect((err) => {
    if (err) {
      console.error("connection error", err.stack);
    } else {
      console.log("Postgres Production Connected");
    }
  });
}

module.exports.client = client;
