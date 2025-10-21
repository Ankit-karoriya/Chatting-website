import jwt from 'jsonwebtoken';
import ApiError from './ApiError.js';

const createTokenAndSaveCookie = (userId, res) => {
    try {
        const token = jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRE});
    
        res.cookie("AccessToken", token, 
            {
                httpOnly: true,
                secure: true,
                sameSite: "strict"
            }
        );
    } catch (error) {
        throw new ApiError(500, `Error while generating Access Token: ${error}`);
    }
}

export default createTokenAndSaveCookie;