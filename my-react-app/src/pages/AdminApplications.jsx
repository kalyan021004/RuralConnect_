import { useEffect, useState } from "react";
import { allApplications, reviewApplication } from "../api/applicationApi";

export default function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);

  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

  const [remarks, setRemarks] = useState({});
  const [loadingId, setLoadingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    setLoading(true);
    const res = await allApplications();
    setApplications(res.data);
    setFilteredApps(res.data);
    setLoading(false);
  };

  /* 🔍 FILTER + SEARCH */
  useEffect(() => {
    let data = [...applications];

    if (statusFilter !== "all") {
      data = data.filter(app => app.status === statusFilter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(app =>
        app.applicationNumber?.toLowerCase().includes(q) ||
        app.user?.name?.toLowerCase().includes(q) ||
        app.scheme?.name?.toLowerCase().includes(q)
      );
    }

    setFilteredApps(data);
  }, [statusFilter, search, applications]);

  const updateStatus = async (id, status) => {
    try {
      setLoadingId(id);
      await reviewApplication(id, {
        status,
        remarks: remarks[id] || ""
      });
      await loadApplications();
    } catch {
      alert("Failed to update status");
    } finally {
      setLoadingId(null);
    }
  };

  /* 📊 STATS */
  const total = applications.length;
  const submitted = applications.filter(a => a.status === "submitted").length;
  const underReview = applications.filter(a => a.status === "under_review").length;
  const pendingDocs = applications.filter(a => a.status === "pending_documents").length;
  const approved = applications.filter(a => a.status === "approved").length;
  const rejected = applications.filter(a => a.status === "rejected").length;

  if (loading) {
    return (
      <div className="container my-5 text-center">
        <span className="spinner-border text-primary"></span>
      </div>
    );
  }

  return (
    <div className="container my-5 bg-white p-4 rounded shadow-sm">

      <h3 className="mb-4">Applications Dashboard</h3>

      {/* 🔢 STATS */}
      <div className="row g-3 mb-4">
        <StatCard title="Total" value={total} color="primary" />
        <StatCard title="Submitted" value={submitted} color="secondary" />
        <StatCard title="Under Review" value={underReview} color="info" />
        <StatCard title="Pending Docs" value={pendingDocs} color="warning" />
        <StatCard title="Approved" value={approved} color="success" />
        <StatCard title="Rejected" value={rejected} color="danger" />
      </div>

      {/* 🔍 FILTER BAR */}
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="Search by applicant, scheme or application no"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="submitted">Submitted</option>
            <option value="under_review">Under Review</option>
            <option value="pending_documents">Pending Documents</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* 📋 TABLE */}
      <div className="table-responsive">
        <table className="table table-bordered align-middle bg-white">
          <thead className="table-light">
            <tr>
              <th>Application No</th>
              <th>Applicant</th>
              <th>Scheme</th>
              <th>Status</th>
              <th>Remarks</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredApps.map(app => (
              <tr key={app._id}>
                <td>{app.applicationNumber}</td>
                <td>{app.user?.name}</td>
                <td>{app.scheme?.name}</td>

                <td>
                  <span className={`badge ${statusBadge(app.status)}`}>
                    {app.status.replace("_", " ")}
                  </span>
                </td>

                <td>
                  <input
                    className="form-control form-control-sm"
                    placeholder="Remarks (optional)"
                    value={remarks[app._id] || ""}
                    onChange={(e) =>
                      setRemarks({ ...remarks, [app._id]: e.target.value })
                    }
                  />
                </td>

                <td className="text-nowrap">
                  <button
                    className="btn btn-info btn-sm me-2"
                    disabled={loadingId === app._id || app.status === "under_review"}
                    onClick={() => updateStatus(app._id, "under_review")}
                  >
                    Review
                  </button>

                  <button
                    className="btn btn-warning btn-sm me-2"
                    disabled={loadingId === app._id || app.status === "pending_documents"}
                    onClick={() => updateStatus(app._id, "pending_documents")}
                  >
                    Docs Pending
                  </button>

                  <button
                    className="btn btn-success btn-sm me-2"
                    disabled={loadingId === app._id || app.status === "approved"}
                    onClick={() => updateStatus(app._id, "approved")}
                  >
                    Approve
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    disabled={loadingId === app._id || app.status === "rejected"}
                    onClick={() => updateStatus(app._id, "rejected")}
                  >
                    Reject
                  </button>

                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => setSelectedApp(app)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}

            {filteredApps.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center">
                  No applications found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔥 MODAL */}
      {selectedApp && (
        <>
          <div className="modal fade show d-block">
            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content bg-white">

                <div className="modal-header">
                  <h5 className="modal-title">Application Details</h5>
                  <button className="btn-close" onClick={() => setSelectedApp(null)}></button>
                </div>

                <div className="modal-body">
                  <h6 className="text-primary">Applicant</h6>
                  <p><b>Name:</b> {selectedApp.user?.name}</p>
                  <p><b>Email:</b> {selectedApp.user?.email}</p>
                  <p><b>Phone:</b> {selectedApp.user?.phone}</p>

                  <hr />

                  <h6 className="text-primary">Scheme</h6>
                  <p><b>Name:</b> {selectedApp.scheme?.name}</p>
                  <p><b>Category:</b> {selectedApp.scheme?.category}</p>
                  <p><b>Description:</b> {selectedApp.scheme?.description}</p>
                  <p><b>Benefits:</b> {selectedApp.scheme?.benefits}</p>

                  <hr />

                  <h6 className="text-primary">Application</h6>
                  <p><b>Application No:</b> {selectedApp.applicationNumber}</p>
                  <p><b>Status:</b> {selectedApp.status}</p>
                  <p><b>Remarks:</b> {selectedApp.remarks || "—"}</p>
                  <p><b>Submitted:</b> {new Date(selectedApp.createdAt).toLocaleString()}</p>
                </div>

                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setSelectedApp(null)}>
                    Close
                  </button>
                </div>

              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}

    </div>
  );
}

/* 🔹 HELPERS */

function statusBadge(status) {
  switch (status) {
    case "submitted": return "bg-secondary";
    case "under_review": return "bg-info text-dark";
    case "pending_documents": return "bg-warning text-dark";
    case "approved": return "bg-success";
    case "rejected": return "bg-danger";
    default: return "bg-secondary";
  }
}

function StatCard({ title, value, color }) {
  return (
    <div className="col-6 col-sm-4 col-md-2">
      <div className="card shadow-sm h-100" style={{ borderLeft: `6px solid var(--bs-${color})` }}>
        <div className="card-body text-center">
          <h6 className="text-muted">{title}</h6>
          <h3 className={`text-${color} fw-bold`}>{value}</h3>
        </div>
      </div>
    </div>
  );
}
