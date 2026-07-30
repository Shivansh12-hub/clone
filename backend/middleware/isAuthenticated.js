    import jwt from "jsonwebtoken";


    const isAuthenticated = async (req, res, next) => {
        try {
            const token = req.cookies.token;
            if (!token) {
                return res.status(402).json({
                    message: "User in not authorised",
                    success:false
                })
            }

            const decode = await jwt.verify(token, process.env.JWT_SECRET);
            if (!decode) {
                return res.status(402).json({
                    message: "Invalid token",
                    success: false
                });
            }

            req.id = decode.userId;
            next();
        }
        catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
    }

    export default isAuthenticated;