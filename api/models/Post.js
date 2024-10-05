const mongoose = require("mongoose");

const PostSchema =new mongoose.Schema(
    {
        title: {
            type: String,
            required:true,
            unique: true,
        },
        desc : {
            type: String,
            required:true,
        },
        photo : {
            type: String,
            required:false,
        },
        username: {
            // type here it's string is because we have to put here links of the pic 
            type: String,   
            required:true,
        },
        categories:{
            type: Array,
            required: false,
        },
    },
    {timestamps : true }
);

module.exports = mongoose.model("Post",PostSchema); 