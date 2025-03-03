import { where } from "sequelize";
import Note from "../models/NoteModel.js";

// ambil data note
export const getNote = async (req, res) => {
    try {
        const response = await Note.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
};

// ambil data note berdasarkan id
export const getNoteById = async (req, res) => {
    try {
        const response = await Note.findOne({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
};

// buat data note
export const createNote = async (req, res) => {
    try {
        await Note.create(req.body);
        res.status(201).json({ msg: "Note created!" });
    } catch (error) {
        console.log(error.message);
    }
};

// update data note
export const updateNote = async (req, res) => {
    try {
        await Note.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json({ msg: "Note updated!" });
    } catch (error) {
        console.log(error.message);
    }
};

// hapus data note
export const deleteNote = async (req, res) => {
    try {
        await Note.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json({msg: "Note deleted!"});
    } catch (error) {
        console.log(error.message);
    }
}