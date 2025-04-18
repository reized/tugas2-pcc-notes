import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils";
import axios from "axios";

const NotesCard = ({ note }) => {
    const navigate = useNavigate();
    const [deleted, setDeleted] = useState(false);

    const handleEdit = (e) => {
        e.stopPropagation();
        navigate(`/edit/${note.id}`);
    };

    const deleteNote = async (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus note ini?")) {
            try {
                await axios.delete(`${ BASE_URL }/notes/${id}`);
                setDeleted(true);
            } catch (error) {
                console.error("Error deleting note:", error);
            }
        }
    };

    if (deleted) return null;

    return (
        <div
            onClick={() => navigate(`/view/${note.id}`)}
            className="w-full bg-white hover:scale-[1.01] duration-200 p-4 flex justify-between items-center rounded-xl shadow-lg hover:shadow-gray-200 shadow-gray-100 border border-gray-200 cursor-pointer"
        >
            <div className="w-3/4">
                <h2 className="text-xl font-bold">{note.note_title}</h2>
                <p className="text-gray-500 truncate">{note.note_content}</p>
            </div>
            <div className="flex gap-2">
                <button
                    onClick={handleEdit}
                    className="w-20 bg-yellow-500 hover:bg-yellow-400 text-white px-2 py-1 rounded cursor-pointer"
                >
                    Edit
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        deleteNote(note.id);
                    }}
                    className="w-20 bg-red-500 hover:bg-red-400 text-white px-2 py-1 rounded cursor-pointer"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default NotesCard;
