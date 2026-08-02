import dotenv from "dotenv";
dotenv.config({});
import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { connect } from "mongoose";
import connectDb from "./utils/database.js";
import userRouter from "./routes/user.routes.js";
import messageRouter from "./routes/message.route.js";
import postRouter from "./routes/post.route.js";

const app = express();

app.get("/", (req,res) => {
    return res.status(200).json({
        message:"App is working"
    })
})

// middleware

app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
const corsOption = {
    origin: 'http://localhost:5173',
    credentials:true,
}

app.use(cors(corsOption));


const PORT = process.env.PORT || 5000;


// apis calling

app.use('/api/v1/user', userRouter);
app.use('/api/v1/post', postRouter);
app.use('/api/v1/message', messageRouter);

app.listen(PORT, () => {
    connectDb()
    console.log("App is listening from port ", PORT);
})

