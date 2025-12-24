import Company from '../Model/Company.model.js';

export const createCompany = async (req,res)=>{
    try {
        const existCompany = await Company.findOne({recruiterID:req.user.id})
        if (existCompany){
            return res.status(400).json({message:"Company already exist"})
        }
        const{companyName,location,website,description}=req.body;
        const company = await Company.create({
            recruiterID:req.user.id,
            companyName,
            location,
            website,
            description
        });
        return res.status(201).json({message:"company created successfully",company})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
export const getCompanyByRecruter = async(req,res)=>{
    try {
        const companies = await Company.findOne({
            recruiterID:req.user.id
        });
        return res.status(200).json(companies)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

// update company 
export const updateCompany = async(req,res)=>{
    try {
        const userId = req.user.id
        const update = req.body
        const company = await Company.findOneAndUpdate({recruiterID:userId},update,{
           new:true
        })
        if(!company){
            return res.status(404).json({message:"company id was not found"})
        }
        return res.status(200).json({message:"company updated succesfully",company})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}