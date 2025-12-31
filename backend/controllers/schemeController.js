import Scheme from "../models/Scheme.js";
export const getAllSchemes=async (req,res)=>{
    const schemes =await Scheme.find({isActive:true});
    res.json(schemes);
}

export const createScheme=async(req,res)=>{
    const scheme=await Scheme.create(req.body);
    res.status(201).json(scheme);

}

// controllers/schemeController.js
export const getSchemeById = async (req, res) => {
  const scheme = await Scheme.findById(req.params.id);
  if (!scheme) return res.status(404).json({ error: "Scheme not found" });
  res.json(scheme);
};


export const toggleSchemeStatus = async (req, res) => {
  const scheme = await Scheme.findById(req.params.id);

  if (!scheme) {
    return res.status(404).json({ error: "Scheme not found" });
  }

  scheme.isActive = !scheme.isActive;
  await scheme.save();

  res.json({
    message: "Scheme status updated",
    isActive: scheme.isActive
  });
};
// ADMIN – get all schemes (active + inactive)
export const getAllSchemesAdmin = async (req, res) => {
  const schemes = await Scheme.find().sort({ createdAt: -1 });
  res.json(schemes);
};



