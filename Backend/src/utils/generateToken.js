import jwt from 'jsonwebtoken';

const createTokenandSaveCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE});
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: true
    });
}