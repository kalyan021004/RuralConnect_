import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/* ==============================
   PROFILE DROPDOWN (REUSABLE)
============================== */
function ProfileDropdown({ user, handleLogout }) {
  return (
    <div className="dropdown">
      <span
        className="nav-link dropdown-toggle d-flex align-items-center gap-2 text-white"
        role="button"
        data-bs-toggle="dropdown"
      >
        <span className="rounded-circle bg-light text-primary fw-bold px-2 py-1">
          {user.name?.charAt(0).toUpperCase()}
        </span>
      </span>

      <ul className="dropdown-menu dropdown-menu-end">
        <li className="dropdown-item-text fw-semibold">
          {user.name}
          <br />
          <small className="text-muted">{user.role}</small>
        </li>

        <li><hr className="dropdown-divider" /></li>

        <li>
          <Link className="dropdown-item" to="/profile">
            My Profile
          </Link>
        </li>

        <li>
          <Link className="dropdown-item" to="/profile/edit">
            Edit Profile
          </Link>
        </li>

        <li><hr className="dropdown-divider" /></li>

        <li>
          <button
            className="dropdown-item text-danger"
            onClick={handleLogout}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

/* ==============================
   NAVBAR
============================== */
export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
      <div className="container-fluid">

        {/* LOGO — ALWAYS LEFT */}
        <Link className="navbar-brand fw-bold" to="/">
          🌾 DigitalConnect
        </Link>

        {/* RIGHT SIDE (MOBILE): PROFILE + TOGGLER */}
        <div className="d-flex align-items-center gap-2 d-lg-none">
          {user && (
            <ProfileDropdown
              user={user}
              handleLogout={handleLogout}
            />
          )}

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        {/* NAV LINKS */}
        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">

            {!user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Signup</Link>
                </li>
              </>
            )}

            {user?.role === "citizen" && (
              <>
                <li className="nav-item dropdown">
                  <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                    Schemes
                  </span>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li><Link className="dropdown-item" to="/schemes">Government Schemes</Link></li>
                    <li><Link className="dropdown-item" to="/my-applications">My Applications</Link></li>
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                    Health Services
                  </span>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li><Link className="dropdown-item" to="/health/doctors">View Doctors</Link></li>
                    <li><Link className="dropdown-item" to="/my-appointments">My Appointments</Link></li>
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                    Grievances
                  </span>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li><Link className="dropdown-item" to="/grievance/new">Submit Grievance</Link></li>
                    <li><Link className="dropdown-item" to="/grievance/mine">My Grievances</Link></li>
                  </ul>
                </li>
              </>
            )}

            {user?.role === "state_admin" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/applications">
                    Applications
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/schemes">
                    Manage Schemes
                  </Link>
                </li>
              </>
            )}

            {user?.role === "doctor_admin" && (
              <li className="nav-item">
                <Link className="nav-link" to="/doctor/appointments">
                  Doctor Appointments
                </Link>
              </li>
            )}

            {user?.role === "gram_panchayat" && (
              <li className="nav-item">
                <Link className="nav-link" to="/grievance/panchayat">
                  Grievances
                </Link>
              </li>
            )}

            {/* PROFILE — DESKTOP ONLY (RIGHT EDGE) */}
            {user && (
              <li className="nav-item d-none d-lg-block">
                <ProfileDropdown
                  user={user}
                  handleLogout={handleLogout}
                />
              </li>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}
