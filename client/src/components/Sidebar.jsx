import {
    LayoutDashboard,
    ListTodo,
    NotebookPen,
    PanelRightClose,
    PanelRightOpen,
    SidebarIcon,
    SquarePen,
    Star,
    Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <aside
            className={`h-screen ${
                sidebarOpen ? "w-[25%]" : "w-11"
            } border bg-black transition-all duration-300 ease-in-out fixed flex flex-col px-1`}
        >
            <div
                className={`hover:bg-white/30 absolute top-2 rounded-sm p-[1.5px] ${
                    sidebarOpen ? "right-2" : "right-2"
                } transition-colors duration-150`}
            >
                {sidebarOpen ? (
                    <PanelRightOpen
                        strokeWidth={2}
                        className={`text-white   `}
                        onClick={() => setSidebarOpen((prev) => !prev)}
                    />
                ) : (
                    <PanelRightClose
                        strokeWidth={2}
                        className={`text-white   `}
                        onClick={() => setSidebarOpen((prev) => !prev)}
                    />
                )}
            </div>

            {/* SIDEBAR MENU */}
            <div className="flex flex-col gap-3 mt-20">
                <Link
                    to={"/dashboard"}
                    className={`flex gap-2 w-full hover:bg-white/20 rounded-sm px-1 py-2 `}
                >
                    <LayoutDashboard className="text-white" />

                    <h4
                        className={`text-white ${
                            sidebarOpen ? "opacity-100" : "opacity-0 absolute "
                        } transition-all duration-400`}
                    >
                        Dashboard
                    </h4>
                </Link>

                <Link
                    to={"/tasks"}
                    className="flex gap-2 w-full hover:bg-white/20 rounded-sm px-1 py-2"
                >
                    <NotebookPen className="text-white" />
                    <h4
                        className={`text-white ${
                            sidebarOpen ? "opacity-100" : "opacity-0 absolute"
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
                            sidebarOpen ? "opacity-100" : "opacity-0 absolute "
                        } transition-all duration-400`}
                    >
                        Tasks
                    </h4>
                </Link>

                <Link
                    to={"/tasks"}
                    className="flex gap-2 w-full hover:bg-white/20 rounded-sm px-1 py-2"
                >
                    <SquarePen className="text-white" />
                    <h4
                        className={`text-white ${
                            sidebarOpen ? "opacity-100" : "opacity-0 absolute"
                        } transition-all duration-400`}
                    >
                        Posts
                    </h4>
                </Link>

                <Link
                    to={"/tasks"}
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
                    to={"/tasks"}
                    className="flex gap-2 w-full hover:bg-white/20 rounded-sm px-1 py-2"
                >
                    <Users className="text-white" />
                    <h4
                        className={`text-white ${
                            sidebarOpen ? "opacity-100" : "opacity-0 absolute"
                        } transition-all duration-400`}
                    >
                        Friends
                    </h4>
                </Link>
            </div>
        </aside>
    );
};

export default Sidebar;
