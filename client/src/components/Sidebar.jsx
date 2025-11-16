import {
    CircleUserRound,
    Compass,
    LayoutDashboard,
    ListTodo,
    LogOut,
    NotebookPen,
    PanelRightClose,
    PanelRightOpen,
    SquarePen,
    Star,
    Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuthStore from "../store/useAuthStore.js";
import useModalStore from "../store/useModalStore.js";
import { FaUserGear } from "react-icons/fa6";

const Sidebar = () => {
    const { user } = useAuthStore();
    const { toggleModal, setData } = useModalStore();

    const location = useLocation();

    // useEffect(() => {
    //     console.log(location);
    // }, [location]);

    // Sidebar Links
    const links = (username) => [
        // {
        //     to: `/profile`,
        //     label: "Profile",
        //     icon: (
        //         <FaUserGear
        //             className={`bg-white text-black rounded-xl size-8 p-0.5 ${
        //                 location.pathname === `/profile`
        //                     ? "ring-2 ring-lime-600"
        //                     : "text-black"
        //             }`}
        //         />
        //     ),
        // },
        {
            to: "/dashboard",
            label: "Dashboard",
            icon: (
                <LayoutDashboard
                    className={` ${
                        location.pathname === `/dashboard`
                            ? "text-lime-400 "
                            : "text-white"
                    }`}
                />
            ),
        },
        {
            to: "/feed",
            label: "Feed",
            icon: (
                <Compass
                    className={` ${
                        location.pathname === `/feed`
                            ? "text-lime-400 "
                            : "text-white"
                    }`}
                />
            ),
        },
        {
            to: "/notes",
            label: "Notes",
            icon: (
                <NotebookPen
                    className={` ${
                        location.pathname === `/notes`
                            ? "text-lime-400 "
                            : "text-white"
                    }`}
                />
            ),
        },
        {
            to: "/tasks",
            label: "Tasks",
            icon: (
                <ListTodo
                    className={` ${
                        location.pathname === `/tasks`
                            ? "text-lime-400 "
                            : "text-white"
                    }`}
                />
            ),
        },
        {
            to: "/posts",
            label: "Posts",
            icon: (
                <SquarePen
                    className={` ${
                        location.pathname === `/posts`
                            ? "text-lime-400 "
                            : "text-white"
                    }`}
                />
            ),
        },
        {
            to: "/starred",
            label: "Starred Posts",
            icon: (
                <Star
                    className={` ${
                        location.pathname === `/starred`
                            ? "text-lime-400 "
                            : "text-white"
                    }`}
                />
            ),
        },
        {
            to: "/friends",
            label: "Friends",
            icon: (
                <Users
                    className={` ${
                        location.pathname === `/friends`
                            ? "text-lime-400  "
                            : "text-white"
                    }`}
                />
            ),
        },
    ];

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
                setSidebarOpen(false);
            }
        }
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const handleLogout = () => {
        setData("Logout", "Are you sure you want to logout?");
        toggleModal(true);
    };

    return (
        <aside
            ref={sidebarRef}
            className={`h-screen ${
                sidebarOpen
                    ? "w-[50%] sm:w-[40%] md:w-[30%] lg:w-[25%] xl:w-[18%]"
                    : "w-13"
            }  border bg-black transition-all duration-300 ease-out fixed flex flex-col px-1 shadow-[0_0_10px_black] z-40 border-r border-r-neutral-100/50`}
        >
            <header className="flex items-center justify-between w-full min-h-20 p-1 mb-2">
                <img
                    src="/Notesk.png"
                    alt="Notesk"
                    className={`max-h-20 aspect-auto transition-all duration-150 ${
                        sidebarOpen
                            ? "translate-x-0 opacity-100"
                            : "-translate-x-100 opacity-0"
                    }`}
                />

                {/* Toggle Button */}
                <div
                    className={`hover:bg-white/30 rounded-sm p-[3px] transition-colors duration-150 cursor-pointer ${
                        !sidebarOpen && "absolute top-5 right-2"
                    }`}
                    onClick={(e) => {
                        e.stopPropagation();
                        setSidebarOpen((prev) => !prev);
                    }}
                >
                    {sidebarOpen ? (
                        <PanelRightOpen
                            size={26}
                            strokeWidth={2}
                            className="text-white"
                        />
                    ) : (
                        <PanelRightClose
                            size={26}
                            strokeWidth={2}
                            className="text-white"
                        />
                    )}
                </div>
            </header>

            {/* Profile Section */}
            <Link
                to={"/profile"}
                className={`flex flex-col items-center sm:flex-row  border-b border-white/20 py-2 min-h-[70px] ${
                    sidebarOpen ? "gap-2" : "gap-2"
                }`}
            >
                {user.profilePicture?.url ? (
                    <img
                        src={user.profilePicture.url}
                        alt="profile"
                        className={`border-2 border-neutral-500 rounded-full object-cover transition-all duration-300
                            ${sidebarOpen ? "size-16" : "size-10"} ${
                            location.pathname === "/profile" &&
                            "ring-2 ring-lime-400"
                        }
                        `}
                    />
                ) : (
                    <CircleUserRound
                        size={sidebarOpen ? 60 : 40}
                        strokeWidth={1.5}
                        className="text-white duration-300"
                    />
                )}

                {/* Slide-in Name */}
                <span
                    className={`text-white text-xl whitespace-nowrap transition-all duration-300 transform
                        ${
                            sidebarOpen
                                ? "opacity-100 translate-x-0 pointer-events-auto"
                                : "opacity-0 -translate-x-5 pointer-events-none"
                        }`}
                >
                    {user.firstname}
                </span>
            </Link>

            {/* Sidebar Links */}
            <div className="flex flex-col gap-2.5 mt-4">
                {links(user.username).map((item) => (
                    <Link
                        key={item.label}
                        to={item.to}
                        className={`flex items-center gap-2 border-white px-1 py-2 hover:bg-white/20 transition-colors duration-200 ${
                            item.label === "Profile"
                                ? "border border-white/30 bg-white/30 rounded-lg"
                                : "rounded-md"
                        } ${
                            item.to === location.pathname &&
                            "bg-white/15 border border-white/10"
                        }`}
                    >
                        {/* Icon (always visible) */}
                        <div className="flex-shrink-0 w-8 flex items-center justify-center text">
                            {item.icon}
                        </div>

                        {/* Slide-in text */}
                        <h4
                            className={`text-white transition-all duration-300 whitespace-nowrap overflow-hidden transform
                                ${
                                    sidebarOpen
                                        ? "opacity-100 translate-x-0 pointer-events-auto"
                                        : "opacity-0 -translate-x-5 pointer-events-none"
                                }`}
                        >
                            {item.label}
                        </h4>
                    </Link>
                ))}
            </div>

            {/* Logout Button */}
            <button
                onClick={handleLogout}
                className="w-full bg-red-600/30 hover:bg-red-600/20 duration-200 border border-red-600 rounded flex items-center justify-start gap-3 absolute bottom-0 left-0 p-1 py-1.5 cursor-pointer overflow-hidden"
            >
                {/* Icon always visible */}
                <div className="flex-shrink-0 w-8 flex items-center justify-center">
                    <LogOut className="text-white" />
                </div>

                {/* Text slides in/out */}
                <span
                    className={`text-white whitespace-nowrap transition-all duration-300 transform
            ${
                sidebarOpen
                    ? "opacity-100 translate-x-0 pointer-events-auto"
                    : "opacity-0 -translate-x-5 pointer-events-none"
            }`}
                >
                    Logout
                </span>
            </button>
        </aside>
    );
};

export default Sidebar;
