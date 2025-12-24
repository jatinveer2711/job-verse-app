import mongoose from "mongoose";
import Job from './job.model.js'

 const ApplicationSchema = new mongoose.Schema({
   
    jobId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job",
        required:true
        
    },
    jobseekerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    resume:String,
    coverLetter:String,
    status:{
        type:String,
        enum:["applied","shortisted","rejected","accepted"],
        default:"applied"
    },
    appliedAt:{
        type:Date,
        default:Date.now
    }

    
},{timestamps:true})
export const Application = mongoose.model("Application", ApplicationSchema);