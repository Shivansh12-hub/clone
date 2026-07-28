import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

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
    Credential:true,
}

app.use(cors(corsOption));


const PORT = 8000;

app.listen(PORT, () => {
    console.log("App is listening from port ", PORT);
})

