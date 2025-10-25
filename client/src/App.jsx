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
import Loader from "./components/Loader.jsx";
import PostsPage from "./pages/PostsPage.jsx";
import FriendsPage from "./pages/FriendsPage.jsx";
import TasksPage from "./pages/TasksPage.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import Feed from "./pages/Feed.jsx";
import PostViewPage from "./pages/PostViewPage.jsx";

const App = () => {
    const { user, checkAuth, isCheckingAuth } = useAuthStore();

    const { modalOpen } = useModalStore();

    useEffect(() => {
        checkAuth();
    }, []);

    if (isCheckingAuth && !user) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <Loader server={true} />;
            </div>
        );
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
                    path="/feed"
                    element={user ? <Feed /> : <LandingPage />}
                ></Route>

                <Route
                    path="/dashboard"
                    element={user ? <Dashboard /> : <LandingPage />}
                ></Route>
                <Route
                    path="/notes"
                    element={user ? <NotesPage /> : <LandingPage />}
                ></Route>
                <Route
                    path="/tasks"
                    element={user ? <TasksPage /> : <LandingPage />}
                ></Route>
                <Route
                    path="/posts"
                    element={user ? <PostsPage /> : <LandingPage />}
                ></Route>
                <Route
                    path="/post/:id"
                    element={user ? <PostViewPage /> : <LandingPage />}
                ></Route>
                <Route
                    path="/friends"
                    element={user ? <FriendsPage /> : <LandingPage />}
                ></Route>
                <Route
                    path="/user-profile/:username"
                    element={user ? <UserProfile /> : <LandingPage />}
                ></Route>

                <Route path="*" element={<NotFoundPage />}></Route>
            </Routes>

            <Toaster position="bottom-center" reverseOrder={false} />

            {modalOpen && <ConfirmationModal />}
        </main>
    );
};

export default App;
