import { create } from "zustand";
import { toast } from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance.js";

const useFriendsStore = create((set, get) => ({
    userProfile: null,
    friends: [],
    friendRequests: [], // incoming requests full docs

    outgoingRequests: [], // IDs of users you sent requests to
    incomingRequests: [], // IDs of users who sent you requests
    searchedUsers: [], // Users from search
    friendsLoading: false,

    getFriends: async () => {
        try {
            set({ friendsLoading: true });

            const response = await axiosInstance.get("/users/friends");
            if (response.status === 200) {
                set({ friends: response.data.friends });
            }
        } catch (error) {
            set({ friendRequests: [] });
        } finally {
            set({ friendsLoading: false });
        }
    },

    getFriendRequests: async () => {
        try {
            set({ friendsLoading: true });

            const response = await axiosInstance.get("/users/friendRequests");
            if (response.status === 200) {
                set({ friendRequests: response.data.requestsReceived });
            }
        } catch (error) {
            set({ friendRequests: [] });
        } finally {
            set({ friendsLoading: false });
        }
    },

    // Initialize requests from user object (call on login)
    setRequestsFromUser: ({ requestsSent, requestsReceived }) => {
        set({
            outgoingRequests: requestsSent.map((id) =>
                id._id ? id._id.toString() : id.toString(),
            ),
            incomingRequests: requestsReceived.map((id) =>
                id._id ? id._id.toString() : id.toString(),
            ),
        });
    },

    // --- Friend Actions ---
    sendFriendRequest: async (id) => {
        const state = get();
        if (!state.outgoingRequests.includes(id)) {
            set({ outgoingRequests: [...state.outgoingRequests, id] }); // optimistic update
        }

        try {
            const response = await axiosInstance.post(
                `/users/send-request/${id}`,
            );
            if (response.status === 200) toast.success("Request sent");
        } catch (error) {
            // revert
            set({
                outgoingRequests: state.outgoingRequests.filter(
                    (reqId) => reqId !== id,
                ),
            });
            toast.error("Failed to send request");
        }
    },

    acceptFriendRequest: async (id) => {
        const state = get();
        set({
            incomingRequests: state.incomingRequests.filter(
                (reqId) => reqId !== id,
            ),
        });

        try {
            const response = await axiosInstance.post(`/users/accept/${id}`);
            if (response.status === 200) toast.success("Request accepted");
        } catch (error) {
            set({ incomingRequests: [...state.incomingRequests, id] });
            toast.error("Failed to accept request");
        }
    },

    declineFriendRequest: async (id) => {
        const state = get();
        set({
            incomingRequests: state.incomingRequests.filter(
                (reqId) => reqId !== id,
            ),
        });

        try {
            const response = await axiosInstance.post(`/users/decline/${id}`);
            if (response.status === 200) toast.success("Request declined");
        } catch (error) {
            set({ incomingRequests: [...state.incomingRequests, id] });
            toast.error("Failed to decline request");
        }
    },

    removeFriend: async (id) => {
        const previousFriends = get().friends;
        const updatedFriends = previousFriends.filter((f) => f._id !== id);

        set({ friends: updatedFriends });

        try {
            const response = await axiosInstance.post(
                `/users/removeFriend/${id}`,
            );

            if (response.status === 200) {
                toast.success("Friend removed");
            } else {
                set({ friends: previousFriends });
                toast.error("Failed to remove friend");
            }
        } catch (error) {
            set({ friends: previousFriends });
            toast.error("Failed to remove friend");
        }
    },

    // -- Search Profile by Username --
    getProfileByUsername: async (username) => {
        try {
            set({ friendsLoading: true });

            const response = await axiosInstance.get(
                `/users/profile/${username}`,
            );

            if (response.status === 200) {
                set({ userProfile: response.data });
            }
        } catch (error) {
            set({ userProfile: null });
        } finally {
            set({ friendsLoading: false });
        }
    },

    // --- Search Users ---
    searchUsers: async (searchValue) => {
        try {
            set({ friendsLoading: true });
            const response = await axiosInstance.get(
                `/users/search/${searchValue}`,
            );
            if (response.status === 200) set({ searchedUsers: response.data });
        } catch (error) {
            set({ searchedUsers: [] });
        } finally {
            set({ friendsLoading: false });
        }
    },
}));

export default useFriendsStore;
