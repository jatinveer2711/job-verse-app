import Profile from "../Model/profile.model.js";

// create profile

export const createProfile = async (req,res)=>{
    try {
        const existUser = await Profile.findOne({userId:req.user.id})
        if(existUser){
            return res.status(400).json({message:"Profile already exist "})
        }
        const {skills,experience,education,resume,portfolioLinks} = req.body;
        const application = await Profile.create({
        userId:req.user.id,
         skills,
         experience,
         education,
         resume,
         portfolioLinks,
         
        });
        return res.status(200).json(application)
    } catch (error) {
        return res.status(500).json({message:error.message})
    };

};


//  get profile

export const getProfile = async (req,res)=>{
    try {
        const profile = await Profile.findOne({userId:req.user.id})
        return res.status(200).json(profile)
    } catch (error) {
        return res.status(500).json({message:error.message})
    };
};


// update 

export const updateProfile = async(req,res)=>{
   try {
    const userId = req.user.id
    const updates = req.body
    const update =await Profile.findOneAndUpdate({userId:userId},updates,{
        new:true
    });
    if(!update){
        return res.status(404).json({message:"profile not found"})
    }
    return res.status(200).json({message:"update successfuly",update})
   } catch (error) {
    return res.status(500).json({message:error.message})
   };
};