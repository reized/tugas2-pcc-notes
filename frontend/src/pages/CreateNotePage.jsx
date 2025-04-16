import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils";

const CreateNotePage = () => {
    const [note_title, setNoteTitle] = useState("");
    const [note_content, setNoteContent] = useState("");

    const navigate = useNavigate();

    const saveNote = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${ BASE_URL }/notes`, {
                note_title,
                note_content,
            });
            navigate(-1);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div>
            <h1 className="text-4xl font-bold">Create Note</h1>
            <form
                onSubmit={saveNote}
                className="w-full bg-white mt-8 p-8 flex flex-col gap-8 rounded-xl drop-shadow-xl"
            >
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="note_title"
                        className="font-semibold text-lg"
                    >
                        Judul Note
                    </label>
                    <input
                        type="text"
                        id="note_title"
                        placeholder="Masukkan judul ..."
                        className="outline outline-gray-300 p-2 rounded-md"
                        value={note_title}
                        onChange={(e) => setNoteTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="note_content"
                        className="font-semibold text-lg"
                    >
                        Isi Note
                    </label>
                    <textarea
                        id="note_content"
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

export default CreateNotePage;
