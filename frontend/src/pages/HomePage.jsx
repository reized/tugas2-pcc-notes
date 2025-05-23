import React, { useState, useEffect } from "react";
import CreateBtn from "../components/CreateBtn";
import NotesCard from "../components/NotesCard";
import axios from "axios";
import { BASE_URL } from "../utils";
import useAuth from "../auth/useAuth";

const HomePage = () => {
    const [notes, setNotes] = useState([]);
    const { accessToken, refreshAccessToken } = useAuth();

    useEffect(() => {
        if (accessToken) {
            getNotes();
        }
    }, [accessToken]);

    const getNotes = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/notes`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setNotes(response.data);
        } catch (error) {
            if (error.response?.status === 401) {
                const newAccessToken = await refreshAccessToken();
                if (newAccessToken && newAccessToken !== "kosong") {
                    try {
                        const response = await axios.get(`${BASE_URL}/notes`, {
                            headers: {
                                Authorization: `Bearer ${newAccessToken}`,
                            },
                        });
                        setNotes(response.data);
                    } catch (err) {
                        console.log("Gagal fetch ulang:", err.message);
                    }
                }
            } else {
                console.log("Gagal fetch notes:", error.message);
            }
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
                    notes.map((note) => <NotesCard key={note.id} note={note} />)
                ) : (
                    <p className="text-gray-500 text-center">
                        Belum ada catatan.
                    </p>
                )}
            </div>
        </>
    );
};

export default HomePage;
