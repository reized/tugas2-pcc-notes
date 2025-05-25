import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils";
import axios from "axios";
import useAuth from "../auth/useAuth";

const NotesCard = ({ note }) => {
    const navigate = useNavigate();
    const [deleted, setDeleted] = useState(false);
    const { accessToken, refreshAccessToken } = useAuth();

    const handleEdit = (e) => {
        e.stopPropagation();
        navigate(`/edit/${note.id}`);
    };

    const deleteNote = async (id) => {
        if (!window.confirm("Apakah Anda yakin ingin menghapus note ini?"))
            return;

        const deleteRequest = async (token) => {
            return await axios.delete(`${BASE_URL}/notes/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        };

        try {
            await deleteRequest(accessToken);
            setDeleted(true);
        } catch (error) {
            if (error.response?.status === 401) {
                try {
                    const newToken = await refreshAccessToken();
                    if (newToken && newToken !== "kosong") {
                        await deleteRequest(newToken);
                        setDeleted(true);
                    }
                } catch (err) {
                    console.error(
                        "Gagal hapus setelah refresh token:",
                        err.message
                    );
                }
            } else {
                console.error("Error deleting note:", error.message);
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
