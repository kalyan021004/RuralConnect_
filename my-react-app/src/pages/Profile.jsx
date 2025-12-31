import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user } = useAuth();

  if (!user) return <p className="text-center mt-5">Loading profile...</p>;

  return (
    <div className="container my-5">
      <div className="card p-4 shadow mx-auto" style={{ maxWidth: 650 }}>
        <h3 className="mb-4">My Profile</h3>

        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Village:</strong> {user.village}</p>
        <p><strong>District:</strong> {user.district}</p>
        <p><strong>State:</strong> {user.state}</p>
        <p><strong>Aadhaar:</strong> {user.aadhaar || "-"}</p>
        <p><strong>Date of Birth:</strong> {user.dateOfBirth ? user.dateOfBirth.split("T")[0] : "-"}</p>
        <p><strong>Gender:</strong> {user.gender || "-"}</p>
        <p><strong>Category:</strong> {user.category || "-"}</p>
        <p><strong>Verified:</strong> {user.isVerified ? "Yes" : "No"}</p>

        <Link to="/profile/edit" className="btn btn-primary mt-3">
          Edit Profile
        </Link>
      </div>
    </div>
  );
}
