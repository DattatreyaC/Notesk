import { ChevronLeft, UserRoundSearch } from "lucide-react";
import React, { useState } from "react";
import useFriendsStore from "../../store/useFriendsStore";

const FriendsHeader = ({
    searchValue,
    setSearchValue,
    searchingNewFriend,
    setSearchingNewFriend,
}) => {
    const { searchUsers } = useFriendsStore();

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchValue || searchValue.trim() === "") {
            return;
        }
        setSearchingNewFriend(true);

        searchUsers(searchValue);
    };

    return (
        <header className="text-center mb-6">
            <h1 className="text-black font-extrabold text-3xl md:text-4xl lg:text-5xl">
                Your Friends
            </h1>

            <div className="flex items-center justify-center ">
                <div className="flex items-center border w-max rounded-2xl overflow-hidden">
                    {searchingNewFriend && (
                        <button
                            className="py-1 px-2.5 bg-black text-white cursor-pointer"
                            onClick={() => setSearchingNewFriend(false)}
                        >
                            <ChevronLeft />
                        </button>
                    )}
                    <form>
                        <input
                            type="text"
                            placeholder="Search Users"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="focus:outline-none px-2.5 py-1  w-xs"
                        />
                    </form>

                    <button
                        className="py-1 px-2.5 bg-black text-white cursor-pointer"
                        onClick={handleSearch}
                    >
                        <UserRoundSearch />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default FriendsHeader;
