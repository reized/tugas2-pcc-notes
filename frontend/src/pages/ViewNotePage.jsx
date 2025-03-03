import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ViewNotePage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [note, setNote] = useState({});

    useEffect(() => {
        noteDetail();
    }, []);

    const noteDetail = async () => {
        try {
            const response = await fetch(`http://localhost:5000/notes/${id}`);
            const data = await response.json();
            setNote(data);
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleEdit = () => {
        navigate(`/edit/${id}`);
    };

    const handleDelete = async () => {
        if (window.confirm("Apakah Anda yakin ingin menghapus note ini?")) {
            try {
                await fetch(`http://localhost:5000/notes/${id}`, {
                    method: "DELETE",
                });
                navigate("/");
            } catch (error) {
                console.error("Error deleting note:", error);
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
