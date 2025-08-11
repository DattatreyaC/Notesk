import jwt from "jsonwebtoken";

const generateToken = (id, res) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET);

    res.cookie("token", token, {
        httpOnly: true,
    });
};

export default generateToken;
