import { Sequelize } from "sequelize";

const db = new Sequelize('notes_db', 'root', '', {
    host: '34.101.142.194',
    dialect: 'mysql',
});

export default db;