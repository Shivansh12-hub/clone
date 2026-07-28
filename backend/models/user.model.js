import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true, 
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        unique: true,
        required:true
    },
    profile: {
        type: String, default: '',
    },
    bio: {
        type: String, default: '',
    },
    gender: {
        type: String,
        emum: ["male", "female"],
    },
    follower: [
        {
            type:mongoose.Schema.Types.ObjectId, ref:"User"
        }
    ],
    following: [
        {
            type:mongoose.Schema.Types.ObjectId, ref:"User"
        }
    ],
    post: [{
        type:mongoose.Schema.Types.ObjectId, ref:"Post"
    }],
    bookmark: [{
        type:mongoose.Schema.Types.ObjectId, ref:"Post"
    }],
    
}, { timestamps: true })

export default User = mongoose.model('User', userSchema);