module.exports = {
  // HOST     : process.env.RDS_HOSTNAME,
  // USER     : process.env.RDS_USERNAME,
  // PASSWORD : process.env.RDS_PASSWORD,
  // port     : process.env.RDS_PORT,
  HOST: process.env.DATABASE_URL,
  USER: process.env.DATABASE_USERNAME,
  PASSWORD: process.env.DATABASE_PASSWORD,
  DB: process.env.DATABASE_NAME,
  dialect: "mysql",
  port: process.env.DATABASE_PORT,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

