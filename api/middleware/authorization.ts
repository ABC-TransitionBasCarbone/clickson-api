import jwt from "jsonwebtoken";

export const authorization = (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const username = decodedToken.userId;

        req.auth = { username };

        next();
    } catch (e) {
        res.status(401).send({ error: "unauthorized" });
    }
};
