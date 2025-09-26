import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import AuthPage from "./pages/AuthPage.jsx";
import useAuthStore from "./store/useAuthStore";
import useModalStore from "./store/useModalStore.js";
import ConfirmationModal from "./components/modals/ConfirmationModal.jsx";
import NotesPage from "./pages/NotesPage.jsx";

const App = () => {
    const { user, checkAuth, isCheckingAuth } = useAuthStore();

    const { title, description, modalOpen } = useModalStore();

    useEffect(() => {
        checkAuth();
    }, []);

    if (isCheckingAuth && !user) {
        return <p>Loading</p>;
    }

    return (
        <main className="flex w-full min-h-screen bg-transparent">
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
                <Route
                    path="/notes"
                    element={user ? <NotesPage /> : <LandingPage />}
                ></Route>

                <Route path="*" element={<NotFoundPage />}></Route>
            </Routes>

            <Toaster position="bottom-center" reverseOrder={false} />

            {modalOpen && <ConfirmationModal />}
        </main>
    );
};

export default App;
