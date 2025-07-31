import { Schema } from "mongoose";
import mongoose from 'mongoose';

// const userModel = mongoose.model(productCollection, productSchema);
//import {Schema, model} from 'mongoose'
//const { Schema, model } = require('mongoose')


const userCollection = "users";


const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'user_premium', 'admin','client'],
        default: 'user'
    },
    cartID: {
        type: Schema.Types.ObjectId,                
        ref:'Cart',
    },
    atCreated: {
        type: Date,
        default: Date.now
    }
})

const userModel = mongoose.model(userCollection, userSchema)

// module.exports = {
//     userModel
// }

export default userModel;