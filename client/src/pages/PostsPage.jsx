import React from "react";
import { useEffect } from "react";
import usePostStore from "../store/usePostStore";
import Loader from "../components/Loader";
import PostCard from "../components/post-components/PostCard";

const PostsPage = () => {
    const { myPosts, fetchMyPosts, postsLoading } = usePostStore();

    useEffect(() => {
        document.title = "Posts";
        fetchMyPosts();
    }, []);

    if (postsLoading && myPosts.length === 0) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <Loader />;
            </div>
        );
    }

    return (
        <section className="bg w-full h-screen flex flex-col pl-12 p-3 overflow-y-auto relative overflow-x-hidden">
            <main>
                <header className="text-center mb-6">
                    <h1 className="text-black font-extrabold text-3xl md:text-4xl lg:text-5xl">
                        Your Posts
                    </h1>
                </header>

                {myPosts.length === 0 ? (
                    <p>You have not posted anything yet</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {myPosts.map((post) => (
                            <PostCard key={post._id} post={post} />
                        ))}
                    </div>
                )}
            </main>
        </section>
    );
};

export default PostsPage;
