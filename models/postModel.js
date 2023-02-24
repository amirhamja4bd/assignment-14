const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            trim:true,
            require: true,
        },
        content:{
            type: String,
            trim:true,
            require: true,
        },
        slug: {
            type: String,
            lowercase: true,
            unique: true,
          },
        author:{
            type: ObjectId,
            ref: "User",
            require: true,
        },
        category: {
            type: ObjectId,
            ref: "Category",
            required: true,
          },
        photo: {
            data: Buffer,
            contentType: String,
        },
    }, {timestamps: true , versionKey: false}
);

const Post = mongoose.model("Post", postSchema);
module.exports =Post;