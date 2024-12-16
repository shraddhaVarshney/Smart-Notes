import { Db } from "mongodb";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String, require: true
    },
    password: {
        type: String,
        require:true
    }
})

export const User = mongoose.model("User",UserSchema)