import React, { useState, useEffect } from "react";
import CreateBtn from "../compontents/CreateBtn";
import NotesCard from "../compontents/NotesCard";

const HomePage = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = async () => {
        try {
            const response = await fetch("http://localhost:5000/notes");
            const data = await response.json();
            setNotes(data);
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
