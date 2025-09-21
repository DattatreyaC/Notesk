import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import useAuthStore from "./store/useAuthStore";

const App = () => {
    const { user, checkAuth, isCheckingAuth } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, []);

    if (isCheckingAuth) {
        console.log(`working`);
        return <p>Loading</p>;
    }

    return (
        <main className="flex bg-transparent">
            {user && <Sidebar />}

            <Routes>
                <Route path="/" element={<LandingPage />}></Route>
                <Route path="/dashboard" element={<Dashboard />}></Route>

                <Route path="*" element={<NotFoundPage />}></Route>
            </Routes>
        </main>
    );
};

export default App;
