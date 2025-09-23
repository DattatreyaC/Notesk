import React from "react";
import useAuthStore from "../../store/useAuthStore";
import useModalStore from "../../store/useModalStore";

const ConfirmationModal = () => {
    const { logout } = useAuthStore();
    const { toggleModal, title, description } = useModalStore();

    const handleLogout = () => {
        logout();
        toggleModal(false);
    };

    return (
        <div className="bg-black/50 w-full h-screen absolute top-0 left-0 z-50">
            <div className="absolute bg-stone-900 border border-black rounded px-5 py-3 left-[1rem] md:left-[40%] top-[40%] space-y-5">
                <h1 className="text-xl text-white">{title}</h1>

                <p className="text-white">{description}</p>

                <div className="flex w-full items-center justify-end gap-2">
                    <button
                        className="text-white bg-red-600/30 border hover:bg-red-600/20 duration-200 border-red-600 px-2.5 py-0.5 rounded cursor-pointer"
                        onClick={handleLogout}
                    >
                        Yes
                    </button>
                    <button
                        className="text-white bg-green-600/30 border hover:bg-green-600/50 duration-200 border-green-600 px-2.5 py-0.5 rounded cursor-pointer"
                        onClick={() => toggleModal(false)}
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
