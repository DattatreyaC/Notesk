import User from "../models/User.js";

export const getOtherUsers = async (req, res) => {
    try {
        const otherUsers = await User.find({
            _id: {
                $ne: req.user._id,
            },
        });

        return res.status(200).json(otherUsers);
    } catch (error) {
        console.log(`Error in getOtherUsers controller : ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("notes").populate("friends").populate("requestsReceived").populate("requestsSent");
        if (user) {
            return res.status(200).json(user);
        }
    } catch (error) {
        console.log(`Error in getProfile controller : ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getFriends = async (req, res) => {
    try {
        const friends = req.user.friends;
        const incomingRequests = req.user.requestsReceived;
        const outgoingRequests = req.user.requestsSent;
        return res.status(200).json({
            friends,
            incomingRequests,
            outgoingRequests,
        });
    } catch (error) {
        console.log(`Error in getFriends controller : ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const sendFriendRequest = async (req, res) => {
    try {
        const senderId = req.user._id;
        const receiverId = req.params.id;

        if(senderId.toString() === receiverId.toString()){
            return res.status(400).json({ message: "You can't send request to yourself" });
        }

        if(req.user.friends.includes(receiverId)){
            return res.status(400).json({ message: "You are already friends with this user" });
        }

        const sender = await User.findByIdAndUpdate(senderId, {
            $push: {
                requestsSent: receiverId,
            },
        });

        const receiver = await User.findByIdAndUpdate(receiverId, {
            $push: {
                requestsReceived: senderId,
            },
        });

        if (sender && receiver) {
            return res.status(200).json({ message: "Request Sent" });
        }
    } catch (error) {
        console.log(`Error in sendFriendRequest controller : ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const acceptFriendRequest = async (req, res) => {
    try{
        const senderId = req.params.id;

        const requests = req.user.requestsReceived;
        if(!requests.includes(senderId)){
            return res.status(404).json({ message: "Request not found" });
        }

        const updatedUser = await User.findByIdAndUpdate(req.user._id,{
            $push :{
                friends: senderId,
            },
            $pull:{
                requestsReceived: senderId,
            },
        })

        const updatedUser2 = await User.findByIdAndUpdate(senderId,{
            $push :{
                friends: req.user._id,
            },
            $pull:{
                requestsSent: req.user._id,
            },
        })

        if(updatedUser && updatedUser2){
            return res.status(200).json({ message: "Friend Request Accepted" });
        }

    }catch(error){
        console.log(`Error in acceptFriendRequest controller : ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const declineFriendRequest = async (req, res) => {
    try{
        const userId = req.params.id;
        const requests = req.user.requestsReceived;

        if(!requests.includes(userId)){
            return res.status(404).json({ message: "Request not found" });
        }

        const updatedUser = await User.findByIdAndUpdate(req.user._id,{
            $pull:{
                requestsReceived:userId,
            }
        })

        const updatedUser2 = await User.findByIdAndUpdate(userId, {
            $pull:{
                requestsSent: req.user._id,
            }
        })

        if(updatedUser && updatedUser2){
            return res.status(200).json({ message: "Friend Request Declined" });
        }
    }catch (error) {
        console.log(`Error in declineFriendRequest controller : ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const removeFriend = async (req, res) => {
    try{
        const friendId = req.params.id;
        if(!req.user.friends.includes(friendId)){
            return res.status(404).json({ message: "Friend not found" });
        }
        const updatedUser = await User.findByIdAndUpdate(req.user._id,{
            $pull:{
                friends: friendId,
            },
        })
        const updatedUser2 = await User.findByIdAndUpdate(friendId,{
            $pull:{
                friends: req.user._id,
            },
        })

        if(updatedUser && updatedUser2){
            return res.status(200).json({ message: "Friend Removed" });
        }

    }catch (error) {
        console.log(`Error in removeFriend controller : ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
}