const { readdirSync } = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const helmet = require("helmet");
const mongoose = require("mongoose");
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");

const router = require('./routes/userRoute');

//Application Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(helmet());

// Server 
const db = "mongodb://127.0.0.1:27017/test"
const port = process.env.PORT || 5000;

// Connect to Database and start server
mongoose.set('strictQuery', true);
mongoose
    .connect(db, {autoIndex: true})
    .then(() => {
        app.listen(port, () => {
            console.log(` Server Running on port ${port}`);
        })
    })
    .catch((error) => console.log(error));


// Route
    app.use("/api/v1", router)

//Undefined Route Implementation
app.use("*",(req, res)=>{
    res.status(404).json({status: 'fail' ,data: "Route Undefined"});
})