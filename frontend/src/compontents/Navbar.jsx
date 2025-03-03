import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="w-full h-16 bg-blue-600 text-white px-64 flex justify-between items-center fixed top-0 z-10">
            <Link to="/">
                <h1 className="font-bold text-2xl">Notes.</h1>
            </Link>
        </div>
    );
};

export default Navbar;
