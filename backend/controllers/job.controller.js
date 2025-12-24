import Job from '../Model/job.model.js';

export const postJob = async (req, res) => {
    try {
        const { title, description, salaryRange, location, skillsRequired, companyId } = req.body
        const post = await Job.create({
            recruiterId: req.user.id,
            title,
            description,
            salaryRange,
            location,
            skillsRequired,
            companyId,

        });
        return res.status(200).json(post)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    };
};

// get job according to role

export const getJob = async (req, res) => {
    const userId = req.user.id
    const role = req.user.role
    try {
        if (role=== "user") {



            const job = await Job.find().
                populate("companyId", "companyName location").
                sort({ createdAt: -1 })
            if (!job.length) {
                return res.status(400).json({ message: "job was not found" })
            }
            return res.status(200).json(job)
        }
        if (role === "recruiter") {
         const myJobs = await Job.find({ recruiterId: userId }).
                populate("companyId", "companyName location").sort({ createdAt: -1 })
        
        if (!myJobs.length) {
            return res.status(404).json({ message: "job was not found" })
        }
        return res.status(200).json(myJobs)
    }




    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}



// search filter

export const searchJob = async (req, res) => {
    try {
        const { keyword } = req.query;
        if (!keyword || keyword.trim() === "") {
            return res.status(400).json({ message: "please provide search keyword" })
        }

        const job = await Job.find({
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        }).populate("companyId", "name location").sort({ createdAt: -1 })

        return res.status(200).json(job)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

// update jobs 
export const updateJob = async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.user.id
        const updates = req.body;
            
        
        const job = await Job.findOneAndUpdate({ _id: id, recruiterId: userId }, updates, {
            new: true
        })
        if (!job) {
            return res.status(404).json({ message: "id was not found" })
        }
         
        return res.status(200).json({ message: "updated successfully", job })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

// delete jobs

export const delteJobs = async (req, res) => {
    const { id } = req.params;

    const userId = req.user.id
    try {
        const job = await Job.findOneAndDelete({ _id: id, recruiterId: userId })
        if (!job) {
            return res.status(404).json({ message: "id was not found" })
        }
        return res.status(200).json({ message: "Job was deleted" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}

// get by id 

export const fetchById = async(req,res)=>{
    const userId = req.user.id
    const {id} =req.params
    try {
        const job = await Job.findOne({recruiterId:userId , _id:id}).populate("companyId","companyName location recruiterId")
        if(!job){
            return res.status(404).json({message:"Jobid was not found" })
        }
        return res.status(200).json(job)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}