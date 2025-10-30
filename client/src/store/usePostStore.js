import { create } from "zustand";
import { toast } from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";

const usePostStore = create((set) => ({
    post: null,
    myPosts: [],
    starredPosts: [],
    feedPosts: [],
    isFeedLoading: false,
    isPostsLoading: false,

    // Fetch user's posts
    fetchMyPosts: async () => {
        set({ isPostsLoading: true });

        try {
            const response = await axiosInstance.get("/posts/myPosts");

            if (response.status === 200) {
                set({ myPosts: response.data });
            } else {
                set({ myPosts: [] });
            }
        } catch (error) {
            console.error("Error fetching posts:", error);

            set({ myPosts: [] });

            toast.error("Unable to load posts", {
                style: {
                    border: "1px solid red",
                    padding: "12px",
                    color: "white",
                    background: "rgba(100,0,0,0.8)",
                },
                iconTheme: {
                    primary: "white",
                    secondary: "red",
                },
            });
        } finally {
            set({ isPostsLoading: false });
        }
    },

    setStarredPosts: (posts) => {
        set({ starredPosts: posts });
    },

    fetchPostById: async (id) => {
        try {
            set({ isPostsLoading: true });

            const response = await axiosInstance.get(`/posts/${id}`);

            if (response.status === 200) {
                set({ post: response.data });
            } else {
                set({ post: null });
            }
        } catch (error) {
            set({ post: null });
        } finally {
            set({ isPostsLoading: false });
        }
    },

    // Fetch feed posts
    fetchFeedPosts: async () => {
        try {
            set({ isFeedLoading: true });

            const response = await axiosInstance.get("/posts/feed");

            if (response.status === 200) {
                set({ feedPosts: response.data });
            } else {
                set({ feedPosts: [] });
            }
        } catch (error) {
            set({ feedPosts: [] });
        } finally {
            set({ isFeedLoading: false });
        }
    },

    // Create a new post
    createPost: async (payload) => {
        set({ isPostsLoading: true });

        try {
            const formData = new FormData();
            formData.append("title", payload.title);
            formData.append("content", payload.content);

            if (payload.media && payload.media.length > 0) {
                payload.media.forEach((file) => {
                    formData.append("media", file);
                });
            }

            const response = await axiosInstance.post(
                "/posts/createPost",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.status === 201) {
                set((state) => ({
                    myPosts: [response.data, ...state.myPosts],
                }));

                toast.success("Post Created", {
                    style: {
                        border: "1px solid green",
                        padding: "12px",
                        color: "black",
                        background: "rgba(0,130,0,0.8)",
                    },
                    iconTheme: {
                        primary: "black",
                        secondary: "green",
                    },
                });

                return true;
            }
        } catch (error) {
            console.error("Error creating post:", error);

            toast.error("Failed to create post", {
                style: {
                    border: "1px solid red",
                    padding: "12px",
                    color: "white",
                    background: "rgba(100,0,0,0.8)",
                },
                iconTheme: {
                    primary: "white",
                    secondary: "red",
                },
            });

            return false;
        } finally {
            set({ isPostsLoading: false });
        }
    },

    deletePost: async (id) => {
        set({ postsLoading: true });

        try {
            const response = await axiosInstance.delete(
                `/posts/deletePost/${id}`
            );

            if (response.status === 200 || response.status === 204) {
                // Remove the deleted post from local store
                set((state) => ({
                    myPosts: state.myPosts.filter((post) => post._id !== id),
                }));

                toast.success("Post deleted", {
                    style: {
                        border: "1px solid green",
                        padding: "12px",
                        color: "black",
                        background: "rgba(0,130,0,0.8)",
                    },
                    iconTheme: {
                        primary: "black",
                        secondary: "green",
                    },
                });

                return true;
            } else {
                throw new Error("Unexpected response status");
            }
        } catch (error) {
            console.error("Error deleting post:", error);

            toast.error("Failed to delete post", {
                style: {
                    border: "1px solid red",
                    padding: "12px",
                    color: "white",
                    background: "rgba(100,0,0,0.8)",
                },
                iconTheme: {
                    primary: "white",
                    secondary: "red",
                },
            });

            return false;
        } finally {
            set({ postsLoading: false });
        }
    },

    starPost: async (postId) => {
        try {
            const response = await axiosInstance.post(
                `/posts/post/star/${postId}`
            );

            if (response.status === 200) {
                set((state) => ({
                    starredPosts: [...state.starredPosts, postId],
                }));

                return true;
            }
        } catch (error) {
            toast.error("Could not star. Please try again", {
                style: {
                    border: "1px solid red",
                    padding: "12px",
                    color: "white",
                    background: "rgba(100,0,0,0.8)",
                },
                iconTheme: {
                    primary: "white",
                    secondary: "red",
                },
            });

            return false;
        }
    },

    unStarPost: async (postId) => {
        try {
            const response = await axiosInstance.post(
                `/posts/post/unstar/${postId}`
            );
            if (response.status === 200) {
                set((state) => ({
                    starredPosts: state.starredPosts.filter(
                        (id) => id !== postId
                    ),
                }));

                return true;
            }
        } catch (error) {
            toast.error("Failed to remove star. Please try again", {
                style: {
                    border: "1px solid red",
                    padding: "12px",
                    color: "white",
                    background: "rgba(100,0,0,0.8)",
                },
                iconTheme: {
                    primary: "white",
                    secondary: "red",
                },
            });
            console.log(error);

            return false;
        }
    },

    upvotePost: async (postId) => {
        try {
            const response = await axiosInstance.post(
                `/posts/post/upvote/${postId}`
            );

            if (response.status === 200) {
            }
        } catch (error) {
            console.log(error);
        }
    },

    revertUpvotePost: async (postId) => {
        try {
            const response = await axiosInstance.post(
                `/posts/post/unupvote/${postId}`
            );
            if (response.status === 200) {
            }
        } catch (error) {
            console.log(error);
        }
    },
}));

export default usePostStore;
