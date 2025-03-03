import React from "react";
import { Link } from "react-router-dom";

const CreateBtn = () => {
    return (
        <Link to="/create">
            <button className="bg-blue-600 hover:opacity-80 text-white px-8 py-2 rounded-lg cursor-pointer">
                <p>Create new</p>
            </button>
        </Link>
    );
};

export default CreateBtn;
