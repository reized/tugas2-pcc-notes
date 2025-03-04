import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import CreateNotePage from "./pages/CreateNotePage";
import EditNotePage from "./pages/EditNotePage";
import ViewNotePage from "./pages/ViewNotePage";

const App = () => {
    return (
        <Router>
            <div className="bg-gray-50">
                <Navbar />
                <main className="px-64 pt-24 min-h-screen">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/create" element={<CreateNotePage />} />
                        <Route path="/edit/:id" element={<EditNotePage />} />
                        <Route path="/view/:id" element={<ViewNotePage />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
