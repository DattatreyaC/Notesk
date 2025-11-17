import React, { useEffect } from "react";
import usePostStore from "../store/usePostStore";
import PostCard from "../components/post-components/PostCard";
import Loader from "../components/Loader";

const StarredPostsPage = () => {
    const { starredPosts, isPostsLoading, fetchStarredPosts } = usePostStore();

    useEffect(() => {
        fetchStarredPosts();
    }, []);

    if (isPostsLoading) {
        return (
            <section className="bg w-full h-screen flex items-center justify-center pl-14 py-5 pr-1">
                <div className="w-full h-fit space-y-3 text-center">
                    <Loader />
                    <span>
                        <p className="font-semibold text-xl">
                            Loading your favourites...
                        </p>
                        <p>Please wait...</p>
                    </span>
                </div>
            </section>
        );
    }

    return (
        <section className="bg w-full h-screen flex flex-col pl-14 p-3 overflow-y-auto relative overflow-x-hidden z-30">
            <main className="w-full">
                <header className="text-center mb-6">
                    <h1 className="text-black font-extrabold text-3xl md:text-4xl lg:text-5xl">
                        Starred Posts
                    </h1>
                </header>

                {starredPosts.length === 0 ? (
                    <p className="font-semibold text-center text-xl h-[30vh] place-content-center">
                        You have not starred any posts yet...
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 place-items-center">
                        {starredPosts.map((post) => {
                            return <PostCard key={post._id} post={post} />;
                        })}
                    </div>
                )}
            </main>
        </section>
    );
};

export default StarredPostsPage;
