import React, { useState } from "react";
import { useEffect } from "react";
import usePostStore from "../store/usePostStore";
import Loader from "../components/Loader";
import PostCard from "../components/post-components/PostCard";
import PostHeader from "../components/post-components/PostHeader";
import CreatePost from "../components/post-components/CreatePost";

const PostsPage = () => {
    const { myPosts, fetchMyPosts, isPostsLoading } = usePostStore();

    const [isCreateOpen, setIsCreateOpen] = useState(false);

    useEffect(() => {
        document.title = "Posts";
        fetchMyPosts();
    }, []);

    return (
        <section className="bg w-full h-screen flex flex-col pl-15 p-3 overflow-y-auto relative overflow-x-hidden">
            <main>
                <header className="text-center mb-6">
                    <h1 className="text-black font-extrabold text-3xl md:text-4xl lg:text-5xl">
                        Your Posts
                    </h1>
                    <PostHeader setIsCreateOpen={setIsCreateOpen} />
                </header>

                {isPostsLoading && myPosts.length === 0 ? (
                    <Loader />
                ) : myPosts.length === 0 && !isPostsLoading ? (
                    <div className="w-full text-center">
                        <p className="w-full text-lg font-semibold">
                            You have not posted anything yet.
                        </p>
                        <p>Click the button to create a post</p>
                    </div>
                ) : (
                    //xl:grid-cols-4
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4 place-items-center">
                        {myPosts.map((post) => (
                            <PostCard key={post._id} post={post} />
                        ))}
                    </div>
                )}
            </main>

            <CreatePost
                isCreateOpen={isCreateOpen}
                setIsCreateOpen={setIsCreateOpen}
            />
        </section>
    );
};

export default PostsPage;
