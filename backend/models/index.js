import db from "../config/Database.js";
import User from "./UserModel.js";
import Note from "./NoteModel.js";

// atur relasi
User.hasMany(Note, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

Note.belongsTo(User, {
    foreignKey: "user_id",
});

(async () => {
    try {
        await db.authenticate();
        console.log("Koneksi database berhasil!");

        await db.sync({ alter: true });
        console.log("Semua tabel berhasil disinkronkan!");
    } catch (error) {
        console.error("Koneksi database gagal:", error);
    }
})();

export { User, Note };
