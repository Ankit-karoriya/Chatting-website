import asyncHandler from '../utils/asyncHandler.js'
import { User } from '../models/user.model.js'
import ApiError from '../utils/ApiError.js'
import ApiResponse from '../utils/ApiResponse.js'
import uploadOnCloudinary from '../utils/cloudinary.js'
import createTokenAndSaveCookie from '../utils/JWT.js'

const registerUser = asyncHandler(async (req, res) => {
    const {username, fullname, password} = req.body;

    if([username, fullname, password].some(field => field?.trim() === "")){
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({username})

    if(existedUser){
        throw new ApiError(409, `User with ${username} already exist`)
    }

    let imageLocalPath;
    if(req.files && Array.isArray(req.files.profileImage) && req.files.profileImage.length > 0){
        imageLocalPath = req.files.profileImage[0].path;
    }

    const uploadedOnCloudImage = await uploadOnCloudinary(imageLocalPath);

    const user = await User.create({
        username: username.toLowerCase(),
        fullname,
        password,
        image: uploadedOnCloudImage?.url || ""
    })

    createTokenAndSaveCookie(user._id, res);

    const createdUser = await User.findById(user._id).select("-password");

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registring the user");
    }

    return res.status(200).json(new ApiResponse(200, "User registered successfully", createdUser));
});

const login = asyncHandler(async (req, res) => {
    const {username, password} = req.body

    //both username and password are required
    if(!username || !password){
        throw new ApiError(401, "username and password is requires to login");
    }

    //find the user is the given username in the database
    const user = await User.findOne({username});
    if(!user){
        throw new ApiError(401, `user with "${username}" username does not exist`)
    }

    //check the password give by the user is correct
    const checkPassword = await user.isPasswordCorrect(password);
    if(!checkPassword){
        throw new ApiError(401, "Password is Incorrect");
    }

    createTokenAndSaveCookie(user._id, res);

    return res.status(200).json(new ApiResponse(200, "User is successfully loggedin", user));

})

const logout = asyncHandler(async (req, res) => {
    //remove the AccessToken cookie from the user response object
    res.clearCookie("AccessToken", {httpOnly: true, secure: true})

    return res.status(200).json(new ApiResponse(200, "User logged out successfully"));
})

export {
    registerUser,
    login,
    logout
}