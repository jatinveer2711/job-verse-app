import mongoose from "mongoose";

export const profileSchema  = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    skills:[String],
    experience:String,
    education:String,
    resume:String,
    portfolioLinks:[String],
   
});

export default mongoose.model("Profile",profileSchema)