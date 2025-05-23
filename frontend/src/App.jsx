import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import CreateNotePage from "./pages/CreateNotePage";
import EditNotePage from "./pages/EditNotePage";
import ViewNotePage from "./pages/ViewNotePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./auth/authProvider";
import ProtectedRoute from "./pages/ProtectedRoute";

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <div className="bg-gray-50">
                    <Navbar />
                    <main className="px-64 pt-24 min-h-screen">
                        <Routes>
                            <Route path="/" element={<LoginPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route
                                path="/register"
                                element={<RegisterPage />}
                            />
                            {/* Protected Routes */}
                            <Route
                                path="/home"
                                element={
                                    <ProtectedRoute>
                                        <HomePage />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/create"
                                element={
                                    <ProtectedRoute>
                                        <CreateNotePage />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/edit/:id"
                                element={
                                    <ProtectedRoute>
                                        <EditNotePage />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/view/:id"
                                element={
                                    <ProtectedRoute>
                                        <ViewNotePage />
                                    </ProtectedRoute>
                                }
                            />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
