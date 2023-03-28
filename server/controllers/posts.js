import Post from "../models/Post.js";
import User from "../models/User.js";

// Create
export const createPost = async (req, res ) => {
    try{
        const { userId, description, picturePath } = req.body;
        const user = await User.findId(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: [],
        });
        await newPost.save();

        const post = await Post.find();
        res.status(201).json(post);
    }catch(err){
        res.status(404).json({message: err.message});
    }
};
// Read
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};


