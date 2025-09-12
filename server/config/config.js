import dotenv from 'dotenv';
dotenv.config();

export default {
  development: {
    username: process.env.DB_USER || "admin",
    password: process.env.DB_PASSWORD || "1234",
    database: process.env.DB_NAME || "sih",
    host: process.env.DB_HOST || "54.173.57.28",
    port: +process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false,
  }
};
