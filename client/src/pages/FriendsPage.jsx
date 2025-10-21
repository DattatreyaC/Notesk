import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import useAuthStore from "../store/useAuthStore";
import useFriendsStore from "../store/useFriendsStore";
import FriendsHeader from "../components/friends-components/FriendsHeader";
import UserCard from "../components/friends-components/UserCard";

const FriendsPage = () => {
    const { user, isCheckingAuth } = useAuthStore();
    const { friends, getFriends, friendRequests, getFriendRequests } =
        useFriendsStore();

    const [displayedFriends, setDisplayedFriends] = useState([]);
    const { searchedUsers, friendsLoading } = useFriendsStore();

    const [searchValue, setSearchValue] = useState("");
    const [searchingNewFriend, setSearchingNewFriend] = useState(false);

    const [activeTab, setActiveTab] = useState("Users");

    // Set friends safely on first render
    useEffect(() => {
        getFriends();
        getFriendRequests();
    }, []);

    useEffect(() => {
        if (!searchValue.trim()) {
            setDisplayedFriends(friends);
            return;
        }

        const filtered =
            friends.filter(
                (f) =>
                    f?.username
                        ?.toLowerCase()
                        .includes(searchValue.toLowerCase()) ||
                    f?.firstname
                        ?.toLowerCase()
                        .includes(searchValue.toLowerCase()) ||
                    f?.lastname
                        ?.toLowerCase()
                        .includes(searchValue.toLowerCase()),
            ) || [];

        setDisplayedFriends(filtered);
    }, [searchValue, friends]);

    if (isCheckingAuth || !user || !friends) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg z-30">
                <Loader />
            </div>
        );
    }

    const friendsToDisplay = searchingNewFriend
        ? searchedUsers
        : displayedFriends;

    return (
        <section className="bg w-full h-screen flex flex-col pl-20 p-10 overflow-y-auto relative overflow-x-hidden z-30">
            <FriendsHeader
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                searchingNewFriend={searchingNewFriend}
                setSearchingNewFriend={setSearchingNewFriend}
            />

            {/* Tabs */}
            <div className="w-full border border-b-0 rounded-t px-2.5 py-1.5 bg-black/85 flex items-center gap-3 shadow-[2px_2px_5px_gray]">
                <button
                    onClick={() => {
                        setActiveTab("Users");
                        getFriends();
                    }}
                    className={` py-1 px-1.5 rounded font-semibold cursor-pointer duration-200 ${
                        activeTab === "Users"
                            ? "bg-neutral-200 text-black"
                            : "hover:bg-white/30 bg-transparent text-white"
                    }`}
                >
                    Users
                </button>

                <button
                    onClick={() => {
                        setActiveTab("Requests");
                        getFriendRequests();
                    }}
                    className={` py-1 px-1.5 rounded font-semibold cursor-pointer duration-200 ${
                        activeTab === "Requests"
                            ? "bg-white text-black"
                            : "hover:bg-white/30 bg-transparent text-white"
                    }`}
                >
                    Friend Requests
                </button>
            </div>

            <div className="w-full flex flex-wrap gap-4 border border-neutral-400 bg-neutral-300 rounded-b min-h-1/2 overflow-x-hidden overflow-y-auto py-8 px-3">
                {friendsLoading && (
                    <span className="text-center flex w-full ">
                        <Loader />
                    </span>
                )}

                {!friendsLoading &&
                    activeTab === "Users" &&
                    friendsToDisplay?.map((friend) => (
                        <UserCard
                            key={friend?._id || friend?.username} // safe key fallback
                            friend={friend}
                            user={user}
                        />
                    ))}

                {activeTab === "Users" && !friendsToDisplay?.length && (
                    <p className="text-center w-full text-black/60 ">
                        {searchingNewFriend
                            ? "No users found. Double check the username."
                            : "No friends found. Click search to find new friends."}
                    </p>
                )}

                {activeTab === "Requests" && (
                    <div className="w-full">
                        {friendRequests.length === 0 && !friendsLoading ? (
                            <p className="w-full h-full text-center place-content-center  text-neutral-700">
                                No requests pending
                            </p>
                        ) : (
                            friendRequests.map((f) => (
                                <UserCard
                                    key={f._id || f.username}
                                    friend={f}
                                    user={user}
                                />
                            ))
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default FriendsPage;
