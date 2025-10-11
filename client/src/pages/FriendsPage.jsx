import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import useAuthStore from "../store/useAuthStore";
import useFriendsStore from "../store/useFriendsStore";
import FriendsHeader from "../components/friends-components/FriendsHeader";
import UserCard from "../components/friends-components/UserCard";

const FriendsPage = () => {
    const { user, isCheckingAuth } = useAuthStore();
    const { friends } = useFriendsStore();

    const [displayedFriends, setDisplayedFriends] = useState([]);
    const { searchedUsers, friendsLoading } = useFriendsStore();

    const [searchValue, setSearchValue] = useState("");
    const [searchingNewFriend, setSearchingNewFriend] = useState(false);

    // Set friends safely on first render
    useEffect(() => {
        if (user?.friends) {
            setDisplayedFriends(friends);
        }
    }, [user]);

    useEffect(() => {
        if (!searchValue.trim()) {
            setDisplayedFriends(user?.friends || []);
            return;
        }

        const filtered =
            user?.friends?.filter(
                (f) =>
                    f?.username
                        ?.toLowerCase()
                        .includes(searchValue.toLowerCase()) ||
                    f?.firstname
                        ?.toLowerCase()
                        .includes(searchValue.toLowerCase()) ||
                    f?.lastname
                        ?.toLowerCase()
                        .includes(searchValue.toLowerCase())
            ) || [];

        setDisplayedFriends(filtered);
    }, [searchValue, user]);

    if (isCheckingAuth || !user || !user.friends) {
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
        <section className="bg w-full h-screen flex flex-col pl-12 p-3 overflow-y-auto relative overflow-x-hidden z-30">
            <FriendsHeader
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                searchingNewFriend={searchingNewFriend}
                setSearchingNewFriend={setSearchingNewFriend}
            />

            <div className="w-full flex flex-wrap gap-4">
                {friendsLoading && (
                    <span className="text-center flex w-full ">
                        <Loader />
                    </span>
                )}

                {!friendsLoading &&
                    friendsToDisplay?.map((friend) => (
                        <UserCard
                            key={friend?._id || friend?.username} // safe key fallback
                            friend={friend}
                            user={user}
                        />
                    ))}

                {!friendsToDisplay?.length && (
                    <span className="text-center w-full mt-10 text-black/60">
                        {searchingNewFriend
                            ? "No users found. Double check the username."
                            : "No friends found. Click search to find new friends."}
                    </span>
                )}
            </div>
        </section>
    );
};

export default FriendsPage;
