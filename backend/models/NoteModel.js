import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Note = db.define('notes', {
    note_title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    note_content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    freezeTableName: true
});

export default Note;

(async () => {
    await db.sync();
    console.log('Notes table created!');
})();