import jwt from "jsonwebtoken";


const isAuthenticated = async (req, resizeBy, next) => {
    try {
        const token = req.cookie.token;
        if (!token) {
            return res.status(402).json({
                message: "User in not authorised",
                success:false
            })
        }

        const decode = await jwt.verify(token, process.JWT_SECRET);
        if (!decode) {
            return res.status(402).json({
                message: "Invalid token",
                success: false
            });
        }

        req.id = decode.userId;
    } catch (error) {
        console.log(error)
    }
}

export default isAuthenticated;