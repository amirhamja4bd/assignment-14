const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema(
    {
        name:{
            type: String,
            trim:true,
            require: true,
        },
        email:{
            type: String,
            trim:true,
            require: true,
            unique: true,
        },
        username:{
            type: String,
            trim:true,
            unique: true,
        },
        password:{
            type: String,
            require: true,
            min: 6,
            max: 64
        },
        role:{
            type: Number,
            default: 0,
        },
        photo: {
            type: String,
            default: "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
        },
    }, {timestamps: true , versionKey: false}
);


const User = mongoose.model("User", userSchema);
module.exports =User;