import { create } from "zustand";

const useModalStore = create((set) => ({
    title: "",
    description: "",
    modalOpen: false,

    setData: (t, d) => {
        set({ title: t });
        set({ description: d });
    },

    toggleModal: (option) => {
        set({ modalOpen: option });
    },
}));

export default useModalStore;
