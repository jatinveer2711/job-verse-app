import mongoose from "mongoose";
import Company from './Company.model.js'
// ...existing code...
const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    skills: String,
    salaryRange: String,
    location: {
        type: String,
        required: true
    },
    skillsRequired: String,
    recruiterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
// ...existing code...
export default mongoose.model("Job", jobSchema);