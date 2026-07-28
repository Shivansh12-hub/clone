import mongoose, { modelNames } from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Mongodb connected successfully")

    } catch (error) {
        console.log("Error while connecting mongoDb", error);
        
    }
}

export default connectDb