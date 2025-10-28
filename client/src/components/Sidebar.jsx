import {
    CircleUserRound,
    Compass,
    LayoutDashboard,
    ListTodo,
    LogOut,
    NotebookPen,
    PanelRightClose,
    PanelRightOpen,
    SidebarIcon,
    SquarePen,
    Star,
    Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore.js";
import ConfirmationModal from "./modals/ConfirmationModal.jsx";
import useModalStore from "../store/useModalStore.js";

const Sidebar = () => {
    const { user } = useAuthStore();
    const { toggleModal, setData } = useModalStore();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const sidebarRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
                setSidebarOpen(false);
            }
        }

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [sidebarRef]);

    const handleLogout = () => {
        setData("Logout", "Are you sure you want to logout?");
        toggleModal(true);
    };

    return (
        <>
            <aside
                ref={sidebarRef}
                // onMouseEnter={() => setSidebarOpen(true)}
                // onMouseLeave={() => setSidebarOpen(false)}
                className={`h-screen ${
                    sidebarOpen
                        ? "w-[50%] sm:w-[40%] md:w-[30%] lg:w-[25%] xl:w-[18%]"
                        : "w-11"
                }  border bg-black transition-all duration-300 ease-out fixed flex flex-col px-1 shadow-[0_0_10px_black] z-40 border-r border-r-neutral-100/50`}
            >
                <div
                    className={`hover:bg-white/30 absolute top-2 rounded-sm p-[3px] ${
                        sidebarOpen ? "right-2" : "right-2"
                    } transition-colors duration-150`}
                >
                    {sidebarOpen ? (
                        <PanelRightOpen
                            strokeWidth={2}
                            className={`text-white   `}
                            onClick={(e) => {
                                e.stopPropagation();
                                setSidebarOpen((prev) => !prev);
                            }}
                        />
                    ) : (
                        <PanelRightClose
                            strokeWidth={2}
                            className={`text-white   `}
                            onClick={(e) => {
                                e.stopPropagation();
                                setSidebarOpen((prev) => !prev);
                            }}
                        />
                    )}
                </div>

                {/* SIDEBAR MENU */}
                <div className="flex flex-col gap-3 mt-20  border-white">
                    <div className="w-full  border-white text-white flex flex-col sm:flex-row items-center gap-1 sm:gap-3 border-b pb-1">
                        {user.profilePicture?.url ? (
                            <img
                                src={user.profilePicture.url}
                                alt="profile picture"
                                className={`border-2 border-neutral-500 rounded-full p-0.5 object-cover ${
                                    sidebarOpen ? "size-18" : "size-10"
                                }`}
                            />
                        ) : (
                            <CircleUserRound size={50} strokeWidth={1.5} />
                        )}

                        <span
                            className={`${
                                sidebarOpen
                                    ? "opacity-100"
                                    : "opacity-0 absolute -translate-x-100"
                            } duration-200 transition-all text-2xl`}
                        >
                            {user.firstname}
                        </span>
                    </div>

                    <Link
                        to={"/dashboard"}
                        className={`flex gap-2 w-full hover:bg-white/20 rounded-sm px-1 py-2 `}
                    >
                        <LayoutDashboard className="text-white" />

                        <h4
                            className={`text-white ${
                                sidebarOpen
                                    ? "opacity-100"
                                    : "opacity-0 absolute "
                            } transition-all duration-400`}
                        >
                            Dashboard
                        </h4>
                    </Link>

                    <Link
                        to={"/feed"}
                        className="flex gap-2 w-full hover:bg-white/20 rounded-sm px-1 py-2"
                    >
                        <Compass className="text-white" />
                        <h4
                            className={`text-white ${
                                sidebarOpen
                                    ? "opacity-100"
                                    : "opacity-0 absolute"
                            } transition-all duration-400`}
                        >
                            Feed
                        </h4>
                    </Link>

                    <Link
                        to={"/notes"}
                        className="flex gap-2 w-full hover:bg-white/20 rounded-sm px-1 py-2"
                    >
                        <NotebookPen className="text-white" />
                        <h4
                            className={`text-white ${
                                sidebarOpen
                                    ? "opacity-100"
                                    : "opacity-0 absolute"
                            } transition-all duration-400`}
                        >
                            Notes
                        </h4>
                    </Link>

                    <Link
                        to={"/tasks"}
                        className={`flex gap-2 w-full hover:bg-white/20 rounded-sm px-1 py-2`}
                    >
                        <ListTodo className="text-white" />
                        <h4
                            className={`text-white ${
                                sidebarOpen
                                    ? "opacity-100"
                                    : "opacity-0 absolute "
                            } transition-all duration-400`}
                        >
                            Tasks
                        </h4>
                    </Link>

                    <Link
                        to={"/posts"}
                        className="flex gap-2 w-full hover:bg-white/20 rounded-sm px-1 py-2"
                    >
                        <SquarePen className="text-white" />
                        <h4
                            className={`text-white ${
                                sidebarOpen
                                    ? "opacity-100"
                                    : "opacity-0 absolute"
                            } transition-all duration-400`}
                        >
                            Posts
                        </h4>
                    </Link>

                    <Link
                        to={"/starred"}
                        className="flex gap-2 w-full hover:bg-white/20 rounded-sm px-1 py-2"
                    >
                        <Star className="ri-star-s-fill text-white" />
                        <h4
                            className={`text-white ${
                                sidebarOpen
                                    ? "opacity-100"
                                    : "opacity-0 absolute whitespace-nowrap overflow-hidden"
                            } transition-all duration-400`}
                        >
                            Starred Posts
                        </h4>
                    </Link>

                    <Link
                        to={"/friends"}
                        className="flex gap-2 w-full hover:bg-white/20 rounded-sm px-1 py-2"
                    >
                        <Users className="text-white" />
                        <h4
                            className={`text-white ${
                                sidebarOpen
                                    ? "opacity-100"
                                    : "opacity-0 absolute"
                            } transition-all duration-400`}
                        >
                            Friends
                        </h4>
                    </Link>
                </div>

                <button
                    className="w-full bg-red-600/30 hover:bg-red-600/20 duration-200 border border-red-600 rounded flex items-center justify-center gap-3 absolute bottom-0 left-0 p-1 cursor-pointer py-1.5"
                    onClick={handleLogout}
                >
                    <LogOut className="text-white" />
                    <span
                        className={`text-white ${
                            sidebarOpen ? "opacity-100" : "opacity-0 absolute"
                        }`}
                    >
                        Logout
                    </span>
                </button>
            </aside>
        </>
    );
};

export default Sidebar;
