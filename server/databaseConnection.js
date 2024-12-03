const mongoose = require("mongoose");
const { databaseLink } = require("./utils/config");

const connectDatabase=async ()=>{
    try {
        await mongoose.connect(databaseLink
        );
        console.log("Connected to the mongoDB database!")
    } catch (error) {
        console.error(error);
    }
}

module.exports = connectDatabase;