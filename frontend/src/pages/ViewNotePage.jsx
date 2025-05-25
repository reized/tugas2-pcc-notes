import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../utils";
import axios from "axios";
import useAuth from "../auth/useAuth";

const ViewNotePage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [note, setNote] = useState({});
    const { accessToken, refreshAccessToken } = useAuth();

    useEffect(() => {
        if (accessToken) {
            noteDetail();
        }
    }, [accessToken]);

    const noteDetail = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/notes/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setNote(response.data);
        } catch (error) {
            if (error.response?.status === 401) {
                const newToken = await refreshAccessToken();
                if (newToken && newToken !== "kosong") {
                    try {
                        const response = await axios.get(
                            `${BASE_URL}/notes/${id}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${newToken}`,
                                },
                            }
                        );
                        setNote(response.data);
                    } catch (err) {
                        console.log("Gagal setelah refresh:", err.message);
                    }
                }
            } else {
                console.error(error.message);
            }
        }
    };

    const handleEdit = () => {
        navigate(`/edit/${id}`);
    };

    const handleDelete = async () => {
        if (window.confirm("Apakah Anda yakin ingin menghapus note ini?")) {
            try {
                await axios.delete(`${BASE_URL}/notes/${id}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                navigate("/");
            } catch (error) {
                if (error.response?.status === 401) {
                    const newToken = await refreshAccessToken();
                    if (newToken && newToken !== "kosong") {
                        try {
                            await axios.delete(`${BASE_URL}/notes/${id}`, {
                                headers: {
                                    Authorization: `Bearer ${newToken}`,
                                },
                            });
                            navigate("/");
                        } catch (err) {
                            console.error(
                                "Gagal hapus setelah refresh:",
                                err.message
                            );
                        }
                    }
                } else {
                    console.error("Error deleting note:", error.message);
                }
            }
        }
    };

    if (!note)
        return <p className="text-center text-gray-500">Memuat note...</p>;

    return (
        <div>
            <h1 className="text-4xl font-bold">View Note</h1>
            <div className="w-full bg-white mt-8 p-8 flex flex-col gap-8 rounded-xl drop-shadow-xl">
                <div className="flex flex-col gap-2">
                    <h2 className="font-semibold text-lg">Judul Note</h2>
                    <p className="bg-gray-100 p-2 rounded-md">
                        {note.note_title}
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="font-semibold text-lg">Isi Note</h2>
                    <p className="bg-gray-100 p-2 rounded-md">
                        {note.note_content}
                    </p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={handleEdit}
                        className="w-full bg-yellow-500 hover:bg-yellow-400 text-white p-2 rounded-md cursor-pointer"
                    >
                        Edit
                    </button>
                    <button
                        onClick={handleDelete}
                        className="w-full bg-red-500 hover:bg-red-400 text-white p-2 rounded-md cursor-pointer"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewNotePage;
