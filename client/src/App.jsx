import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import AuthPage from "./pages/AuthPage.jsx";
import useAuthStore from "./store/useAuthStore";

const App = () => {
    const { user, checkAuth, isCheckingAuth } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, []);

    if (isCheckingAuth && !user) {
        console.log(`working`);
        return <p>Loading</p>;
    }

    return (
        <main className="flex bg-transparent">
            {user && <Sidebar />}

            <Routes>
                <Route path="/" element={<LandingPage />}></Route>

                <Route
                    path="/auth"
                    element={
                        !user ? <AuthPage /> : <Navigate to={"/dashboard"} />
                    }
                ></Route>
                <Route
                    path="/dashboard"
                    element={user ? <Dashboard /> : <LandingPage />}
                ></Route>

                <Route path="*" element={<NotFoundPage />}></Route>
            </Routes>
        </main>
    );
};

export default App;
