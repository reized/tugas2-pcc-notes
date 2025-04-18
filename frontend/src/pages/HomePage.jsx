import React, { useState, useEffect } from "react";
import CreateBtn from "../components/CreateBtn";
import NotesCard from "../components/NotesCard";
import axios from "axios";
import { BASE_URL } from "../utils";

const HomePage = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = async () => {
        try {
            const response = await axios.get(`${ BASE_URL }/notes`);
            setNotes(response.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold">My Notes</h1>
                <CreateBtn />
            </div>
            <div className="h-96 w-full flex flex-col gap-4">
                {notes.length > 0 ? (
                    notes.map((note) => (
                        <NotesCard
                            key={note.id}
                            note={note}
                        />
                    ))
                ) : (
                    <p className="text-gray-500 text-center">Belum ada catatan.</p>
                )}
            </div>
        </>
    );
};

export default HomePage;
