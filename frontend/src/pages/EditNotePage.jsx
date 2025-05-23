import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils";
import useAuth from "../auth/useAuth";

const EditNotePage = () => {
    const [note_title, setNoteTitle] = useState("");
    const [note_content, setNoteContent] = useState("");
    const { accessToken, refreshAccessToken } = useAuth();

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (accessToken) {
            getNoteById(id);
        }
    }, [accessToken]);

    const getNoteById = async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/notes/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setNoteTitle(response.data.note_title);
            setNoteContent(response.data.note_content);
        } catch (error) {
            if (error.response?.status === 401) {
                const newAccessToken = await refreshAccessToken();
                if (newAccessToken && newAccessToken !== "kosong") {
                    try {
                        const response = await axios.get(
                            `${BASE_URL}/notes/${id}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${newAccessToken}`,
                                },
                            }
                        );
                        setNoteTitle(response.data.note_title);
                        setNoteContent(response.data.note_content);
                    } catch (err) {
                        console.log("Gagal fetch ulang note:", err.message);
                    }
                }
            } else {
                console.log("Gagal fetch note:", error.message);
            }
        }
    };

    const updateNote = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(
                `${BASE_URL}/notes/${id}`,
                { note_title, note_content },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            navigate(-1);
        } catch (error) {
            if (error.response?.status === 401) {
                const newAccessToken = await refreshAccessToken();
                if (newAccessToken && newAccessToken !== "kosong") {
                    try {
                        await axios.patch(
                            `${BASE_URL}/notes/${id}`,
                            { note_title, note_content },
                            {
                                headers: {
                                    Authorization: `Bearer ${newAccessToken}`,
                                },
                            }
                        );
                        navigate(-1);
                    } catch (err) {
                        console.log(
                            "Gagal update setelah refresh:",
                            err.message
                        );
                    }
                }
            } else {
                console.log("Gagal update:", error.message);
            }
        }
    };

    return (
        <div>
            <h1 className="text-4xl font-bold">Edit Note</h1>
            <form
                onSubmit={updateNote}
                className="w-full bg-white mt-8 p-8 flex flex-col gap-8 rounded-xl drop-shadow-xl"
            >
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="noteTitle"
                        className="font-semibold text-lg"
                    >
                        Judul Note
                    </label>
                    <input
                        type="text"
                        id="noteTitle"
                        placeholder="Masukkan judul ..."
                        className="outline outline-gray-300 p-2 rounded-md"
                        value={note_title}
                        onChange={(e) => setNoteTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="noteContent"
                        className="font-semibold text-lg"
                    >
                        Isi Note
                    </label>
                    <textarea
                        id="noteContent"
                        rows="10"
                        placeholder="Masukkan isi ..."
                        className="outline outline-gray-300 p-2 rounded-md"
                        value={note_content}
                        onChange={(e) => setNoteContent(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="flex gap-4">
                    <button
                        type="button"
                        className="w-full bg-gray-500 hover:bg-gray-400 text-white p-2 rounded-md cursor-pointer"
                        onClick={() => navigate(-1)}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-md cursor-pointer"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditNotePage;
