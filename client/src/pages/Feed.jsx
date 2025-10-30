import React, { useEffect } from "react";
import usePostStore from "../store/usePostStore";
import FeedPostCard from "../components/post-components/FeedPostCard";
import useAuthStore from "../store/useAuthStore";

const Feed = () => {
    const { feedPosts, setStarredPosts, fetchFeedPosts, isFeedLoading } =
        usePostStore();
    const { user } = useAuthStore();

    useEffect(() => {
        fetchFeedPosts();
        setStarredPosts(user.starredPosts);
    }, []);

    return (
        <section className="bg w-full h-screen flex flex-col pl-14 py-5 pr-1 overflow-y-auto relative overflow-x-hidden z-30">
            <main className="flex flex-col items-center w-full">
                {/* Page Header */}
                <header className="w-full text-center mb-5">
                    {/* <h1 className="text-black font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight">
                        Your Feed
                    </h1> */}
                </header>

                {/* Feed List */}
                <article
                    className="
                        flex flex-col gap-6
                        w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl
                        md:px-4
                        transition-all duration-200
                    "
                >
                    {isFeedLoading && feedPosts.length === 0 ? (
                        <p className="text-center text-neutral-400 text-sm tracking-wide py-20">
                            Loading your feed...
                        </p>
                    ) : !isFeedLoading && feedPosts.length === 0 ? (
                        <p className="text-center text-neutral-400 text-sm tracking-wide py-20">
                            Your feed is empty 💤
                        </p>
                    ) : (
                        feedPosts.map((post) => (
                            <FeedPostCard key={post._id} postId={post._id} />
                        ))
                    )}
                </article>

                {/* Bottom Spacer for scroll breathing room */}
                <div className="h-10" />
            </main>
        </section>
    );
};

export default Feed;
