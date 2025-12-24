import {Application} from "../Model/Application.model.js";
import Job from '../Model/job.model.js';

// apply job

export const applyJob = async (req,res)=>{
    
    try {
        const {jobId,coverLetter,resume,status} = req.body;
        const application = await Application.create({
             jobId,
             coverLetter,
             resume,
             status,
             jobseekerId:req.user.id

        });
        return res.status(200).json(application)
    } catch (error) {
        return res.status(500).json({message:error.message})
        
    };
};




// get application

export const getApplication = async (req,res)=>{
    try {
        const application = await Application.find({jobseekerId:req.user.id,
            
        }).populate("jobId").sort({createdAt: -1})
        return res.status(200).json(application)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

// get recruiter  applications 



export const recruiterApplications = async (req, res) => {
    try {
        const recruiterId = req.user.id;
        

        // 1️⃣ find recruiter jobs
        const jobs = await Job.find({ recruiterId:recruiterId ,
            
        }).select("_id");

        if (jobs.length === 0) {
            return res.status(200).json({ message: "No jobs posted yet", applications: [] });
        }

        // 2️⃣ fetch all aplication on this jobs
        const jobIds = jobs.map(job => job._id);

        const applications = await Application.find({
            jobId: { $in: jobIds } ,
            status:{$ne: "rejected"}
        }).sort({createdAt : -1})
        .populate("jobId", "title location salaryRange ")
        .populate("jobseekerId", "name email ");

        return res.status(200).json({ applications });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
};

export const updateApplications = async(req,res)=>{
    try {
        const {status}= req.body;
        const {id} = req.params;
        const validStatuses = ["applied","shortisted","rejected","accepted"];
        if(!validStatuses.includes(status)){
            return res.status(400).json({message:"invalid status"})
        }
        const application = await Application.findOneAndUpdate({
            _id:id} ,{status},{
                new:true
            })
       if(!application){
        return res.status(400).json({message:"application not found"})
       }
       return res.status(200).json(application).sort({createdAt: -1})
    } catch (error) {
        return res.status(500).json({message:error.message})
    };
};


// delete applications 

export const deleteApplication = async(req,res)=>{
    const {id} = req.params;
    const userId = req.user.id
    try {
        const job = await Application.findOneAndDelete({jobseekerId:userId,_id:id});
        if(!job){
            return res.status(404).json({message:"Application not found"})
        }
        return res.status(200).json({message:"Application was delted successfully",job})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

