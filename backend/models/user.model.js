import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['student','recruiter'],
        required:true
    },
    profile:{
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String}, // Base64 encoded resume file
        resumeOriginalName:{type:String},
        resumeMimeType:{type:String}, // e.g., 'application/pdf', 'image/png'
        company:{type:mongoose.Schema.Types.ObjectId, ref:'Company'}, 
        profilePhoto:{
            type:String, // Base64 encoded profile photo
            default:""
        },
        profilePhotoMimeType:{type:String} // e.g., 'image/jpeg', 'image/png'
    },
},{timestamps:true});
export const User = mongoose.model('User', userSchema);