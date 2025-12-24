import mongoose from "mongoose";
export const companyShema = new mongoose.Schema({
    recruiterID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    companyName:{
        type:String,
        required:true
    },
    location:String,
    website:String,
    description:String,


})
export default mongoose.model("Company",companyShema)