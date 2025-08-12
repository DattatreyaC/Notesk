import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";

const App = () => {
    return (
        <main className="flex bg-transparent">
            <Sidebar />
            <Routes>
                <Route path="/" element={<LandingPage />}></Route>
                <Route path="/dashboard" element={<Dashboard />}></Route>

                <Route path="*" element={<NotFoundPage />}></Route>
            </Routes>
        </main>
    );
};

export default App;
