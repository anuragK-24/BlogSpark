const router = require("express").Router(); 
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

//for updating user 

//when we are creatin then it should have "post" method. 
//for fetching the data we can use get 
router.put("/:id",async(req,res) => {
    if(req.body.userId === req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{
                $set : req.body,
            },{new:true});
            // by new true the updated version of the info we'll able to see in the postman
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err);  
        }
    }
    else{
        res.status(401).json("you can update only your account  ")
    }
})
// here status 500 means that something is wrong with the mongoDB

//req is what we are sending to the server, and res what we are getting from the server 
// while doing asynch operation use try and catch block 

//for Deleting user 
router.delete("/:id",async(req,res) => {
    if(req.body.userId === req.params.id){
        try {
            const user = await User.findById(req.params.id);
            try {
                await Post.deleteMany({username : user.username})
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json("User has been deleted ...");
            } catch (err) {
                res.status(500).json(err);  
            } 
        }  
        catch (error) {
            res.status(404).json("User not found ")
        }
        
    }
    else{
        res.status(401).json("you can delete only your account  ")
    }
})


//get user
router.get("/:id",async(req,res) => {
    try {
        const user = await User.findById(req.params.id);

        const {password, ...others} = user._doc

        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(err);
    }
})
module.exports = router;