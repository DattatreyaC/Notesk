import Post from "../models/Post.js";
import post from "../models/Post.js";

export const createPost = async(req,res)=>{
    try{
        const {title,content} = req.body;
        const createdPost = await Post.create({
            title,
            content,
            user: req.user._id,
        })
        if(createdPost){
            return res.status(201).json(createdPost);
        }
    }catch(error){
        console.log(`Error in createPost controller : ${error}`);
        return res.status(500).json({message:"Internal server error"});
    }
}

export const editPost = async(req,res)=>{
    try{
        const {title,content} = req.body;
        const id = req.params.id;
        const updatedPost = await Post.findByIdAndUpdate(id,{
            title,
            content,
        },{
            new:true
        })
        if(updatedPost){
            return res.status(200).json(updatedPost);
        }
        else{
            return res.status(404).json({message:"Post not found"});
        }
    }catch(error){
        console.log(`Error in editPost controller : ${error}`);
        return res.status(500).json({message:"Internal server error"});
    }
}

export const deletePost = async(req,res)=>{
    try{
        const id = req.params.id;
        const deletedPost = await Post.findByIdAndDelete(id);
        if(deletedPost){
            return res.status(201).json(deletedPost);
        }
        else{
            return res.status(404).json({message:"Post not found"});
        }
    }catch (error) {
        console.log(`Error in deletePost controller : ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }

}

export const getMyPosts = async(req,res)=>{
    try{
        const myPosts = await Post.find({ user: req.user._id });
        return res.status(200).json(myPosts);
    }catch(error){
        console.log(`Error in getMyPosts controller : ${error}`);
        return res.status(500).json({message:"Internal server error"});
    }
}

export const getFriendsPosts = async(req,res)=>{
    try{
        const friends = req.user.friends;
        if(friends.length === 0){
            return res.status(404).json({message:"No friends found"});
        }
        const posts = await Post.find({
            user: {
                $in: friends
            }
        })
        return res.status(200).json(posts);
    }catch(error){
        console.log(`Error in getFriendsPosts controller : ${error}`);
        return res.status(500).json({message:"Internal server error"});
    }
}

export const getPostsOfUser = async(req,res)=>{
    try
    {
        const userId = req.params.id;
        const posts = await Post.find({user : userId});
        return res.status(200).json(posts);
    }catch(error){
        console.log(`Error in getPostsOfUser controller : ${error}`);
        return res.status(500).json({message:"Internal server error"});
    }
}

export const getAllPosts = async(req,res)=>{
    try{
        const allPosts = await Post.find();
        return res.status(200).json(allPosts);
    }catch(error){
        console.log(`Error in getAllPosts controller : ${error}`);
        return res.status(500).json({message:"Internal server error"});
    }
}

