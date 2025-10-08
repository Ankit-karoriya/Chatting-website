import asyncHandler from '../utils/asyncHandler.js'
import { User } from '../models/user.model.js'
import ApiError from '../utils/ApiError.js'
import ApiResponse from '../utils/ApiResponse.js'
import uploadOnCloudinary from '../utils/cloudinary.js'

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

    const createdUser = await User.findById(user._id).select("");

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registring the user");
    }

    return res.status(200).json(new ApiResponse(200, "User registered successfully", createdUser));
})

export {
    registerUser
}