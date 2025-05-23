import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const {
    DB_HOST: host,
    DB_USERNAME: username,
    DB_PASSWORD: password,
    DB_NAME: database,
} = process.env;

const db = new Sequelize(database, username, password, {
    host,
    dialect: 'mysql',
});

// const db = new Sequelize('notes_db', 'root', '', {
//     host: '34.101.142.194',
//     dialect: 'mysql',
// });

export default db;