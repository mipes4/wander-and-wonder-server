require("dotenv").config();

module.exports = {
  development: {
    username: "postgres",
    password: "secret",
    database: "Wander and Wonder development",
    host: "localhost",
    dialect: "postgres",
    operatorsAliases: "0",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "postgres",
    operatorsAliases: "0",
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
  },
};
