const mongoose = require("mongoose");
const {Schema} = mongoose;

const catSchema = new Schema(
    {
        name:{
            type: String,
            trim:true,
            require: true,
            unique: true,
            maxLength: 32,
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
        },
    }, {timestamps: true , versionKey: false}
);

const Category = mongoose.model("Category", catSchema);
module.exports =Category;