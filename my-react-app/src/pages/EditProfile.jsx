import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    village: "",
    district: "",
    state: "",
    aadhaar: "",
    dateOfBirth: "",
    gender: "",
    category: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Populate form
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        village: user.village || "",
        district: user.district || "",
        state: user.state || "",
        aadhaar: user.aadhaar || "",
        dateOfBirth: user.dateOfBirth
          ? user.dateOfBirth.split("T")[0]
          : "",
        gender: user.gender || "",
        category: user.category || ""
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const res = await api.put("/auth/profile", {
        name: form.name,
        phone: form.phone,
        village: form.village,
        district: form.district,
        state: form.state,
        aadhaar: form.aadhaar || null,
        gender: form.gender || null,
        category: form.category || null,
        dateOfBirth: form.dateOfBirth || null
      });

      updateUser(res.data.user);
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.error || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container my-5">
      <div className="card p-4 shadow mx-auto" style={{ maxWidth: 650 }}>
        <h3 className="mb-4">Edit Profile</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={submit}>
          <input
            className="form-control mb-3"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            value={form.email}
            placeholder="Email"
            disabled
          />

          <input
            className="form-control mb-3"
            name="phone"
            placeholder="Mobile Number"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            name="village"
            placeholder="Village / Town"
            value={form.village}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            name="district"
            placeholder="District"
            value={form.district}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            name="aadhaar"
            placeholder="Aadhaar Number (Optional)"
            value={form.aadhaar}
            onChange={handleChange}
          />

          <input
            type="date"
            className="form-control mb-3"
            name="dateOfBirth"
            placeholder="Date of Birth"
            value={form.dateOfBirth}
            onChange={handleChange}
          />

          <select
            className="form-select mb-3"
            name="gender"
            value={form.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <select
            className="form-select mb-3"
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="general">General</option>
            <option value="obc">OBC</option>
            <option value="sc">SC</option>
            <option value="st">ST</option>
            <option value="other">Other</option>
          </select>

          <button className="btn btn-primary" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
