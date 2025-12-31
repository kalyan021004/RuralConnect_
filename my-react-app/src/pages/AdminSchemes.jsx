import { useEffect, useState } from "react";
import {
  fetchAllSchemesAdmin,
  toggleSchemeStatus
} from "../api/schemeApi";

export default function AdminManageSchemes() {
  const [schemes, setSchemes] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    loadSchemes();
  }, []);

  const loadSchemes = async () => {
    const res = await fetchAllSchemesAdmin();
    setSchemes(res.data);
  };

  const toggleStatus = async (id) => {
    try {
      setLoadingId(id);
      await toggleSchemeStatus(id);
      await loadSchemes(); // 🔄 refresh
    } catch {
      alert("Failed to update scheme status");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="container my-5">
      <h3 className="mb-4">Manage Government Schemes</h3>

      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {schemes.map((scheme) => (
              <tr key={scheme._id}>
                <td>{scheme.name}</td>
                <td>{scheme.category}</td>

                <td>
                  <span
                    className={`badge ${
                      scheme.isActive
                        ? "bg-success"
                        : "bg-secondary"
                    }`}
                  >
                    {scheme.isActive ? "Active" : "Inactive"}
                  </span>
                </td>

                <td>
                  <button
                    className={`btn btn-sm ${
                      scheme.isActive
                        ? "btn-danger"
                        : "btn-success"
                    }`}
                    disabled={loadingId === scheme._id}
                    onClick={() => toggleStatus(scheme._id)}
                  >
                    {loadingId === scheme._id
                      ? "Updating..."
                      : scheme.isActive
                      ? "Deactivate"
                      : "Activate"}
                  </button>
                </td>
              </tr>
            ))}

            {schemes.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center">
                  No schemes found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
