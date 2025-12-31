import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";
//Register Routes

export const register = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            password,
            role,
            village,
            district,
            state
        } = req.body;
        if (["gram_panchayat", "state_admin", "doctor_admin"].includes(role)) {
            const exists = await User.findOne({ role });
            if (exists) {
                return res.status(400).json({
                    error: '${role} already exists'
                });
            }



        }
        const user = await User.create({
            name,
            email,
            phone,
            password,
            role,
            village,
            district,
            state
        });

        res.status(201).json({ message: "Registered Successfully" });

    } catch (err) {
        res.status(500).json({ error: "err.message" });

    }
}


// Login

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ error: "Missing login fields" });
    }

    const user = await User.findOne({ email, role });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role
      }
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};


// GET PROFILE
export const getProfile = async (req, res) => {
  try {
    // req.user is set by auth middleware
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("GET PROFILE ERROR:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};




export const updateProfile = async (req, res) => {
  try {
    const user = req.user; // from auth middleware

    const {
      name,
      phone,
      village,
      district,
      state,
      aadhaar,
      dateOfBirth,
      gender,
      category,
      profileImage
    } = req.body;

    // Required fields
    if (!name || !phone || !village || !district || !state) {
      return res.status(400).json({
        error: "Name, phone, village, district, and state are required"
      });
    }

    // Update required fields
    user.name = name;
    user.phone = phone;
    user.village = village;
    user.district = district;
    user.state = state;

    // Optional fields
    user.aadhaar = aadhaar || undefined;
    user.dateOfBirth = dateOfBirth || undefined;
    user.gender = gender || undefined;
    user.category = category || undefined;
    user.profileImage = profileImage || undefined;

    await user.save();

    // 🔥 IMPORTANT: return updated user
    res.json({ user });

  } catch (err) {
    console.error("UPDATE PROFILE ERROR:", err.message);

    if (err.code === 11000) {
      return res.status(400).json({
        error: "Duplicate value (phone or aadhaar already exists)"
      });
    }

    res.status(500).json({ error: "Server error" });
  }
};
