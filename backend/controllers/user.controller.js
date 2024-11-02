import User from "../models/user.js";
import Post from "../models/post.js";

export const getUsers = async (req, res) => {
    //  console.log("requestt",req.user._id);

    try{

        const foundUsers = await User.find({_id:  req.user._id}).select("-password");
        // console.log(foundUsers);
        res.status(200).json(foundUsers);


    }catch(err){

        res.status(500).json({message: err.message});

    }
}

export const getPosts = async (req, res) => {

    // console.log("id of usere ", req.user);
    
    try{

        const foundPosts = await Post.find({user: req.user._id});
         console.log(foundPosts);
        res.status(200).json(foundPosts);

    }catch(err){
        
        res.status(500).json({message: err.message});
        

    }

}