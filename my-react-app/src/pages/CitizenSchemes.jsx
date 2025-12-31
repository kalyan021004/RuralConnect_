import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSchemes, applyScheme } from "../api/schemeApi";

const CATEGORIES = [
  "all",
  "agriculture",
  "education",
  "health",
  "housing",
  "employment",
  "social_welfare"
];

export default function CitizenSchemes() {
  const navigate = useNavigate();

  const [schemes, setSchemes] = useState([]);
  const [filteredSchemes, setFilteredSchemes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    fetchSchemes()
      .then(res => {
        setSchemes(res.data);
        setFilteredSchemes(res.data);
      })
      .catch(() => alert("Failed to load schemes"));
  }, []);

  // 🔥 FILTER LOGIC
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredSchemes(schemes);
    } else {
      setFilteredSchemes(
        schemes.filter(s => s.category === selectedCategory)
      );
    }
  }, [selectedCategory, schemes]);

  const apply = async (schemeId, e) => {
    e.stopPropagation();
    try {
      setLoadingId(schemeId);
      const res = await applyScheme(schemeId);

      alert(
        `🎉 Application submitted successfully!\n\nApplication No: ${res.data.applicationNumber}`
      );
    } catch (err) {
      alert(err.response?.data?.error || "Application failed");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="container my-5">

      {/* PAGE HEADER */}
      <div className="text-center mb-4">
        <h2 className="page-title">Government Schemes</h2>
        <p className="page-subtitle">
          Browse and apply for active government welfare schemes
        </p>
      </div>

      {/* 🔥 FILTER BAR */}
      <div className="d-flex justify-content-end mb-4">
        <select
          className="form-select w-auto"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>
              {cat === "all"
                ? "All Categories"
                : cat.replace("_", " ").toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {/* EMPTY STATE */}
      {filteredSchemes.length === 0 && (
        <div className="alert text-center">
          No schemes available for this category.
        </div>
      )}

      {/* SCHEME LIST */}
      <div className="row g-4">
        {filteredSchemes.map(scheme => (
          <div className="col-md-6 col-lg-4" key={scheme._id}>
            <div
              className="card scheme-card h-100"
              role="button"
              onClick={() => navigate(`/schemes/${scheme._id}`)}
            >
              <div className="card-body d-flex flex-column">

                <h5 className="mb-2">{scheme.name}</h5>

                <span className="badge bg-secondary mb-2 align-self-start">
                  {scheme.category.replace("_", " ").toUpperCase()}
                </span>

                <p className="flex-grow-1">
                  {scheme.description.length > 120
                    ? scheme.description.slice(0, 120) + "..."
                    : scheme.description}
                </p>

                <div className="d-flex justify-content-between align-items-center mt-3">
                  <span className="badge badge-active">Active</span>

                  <button
                    className="btn btn-apply btn-sm"
                    disabled={loadingId === scheme._id}
                    onClick={(e) => apply(scheme._id, e)}
                  >
                    {loadingId === scheme._id ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-1"></span>
                        Applying
                      </>
                    ) : (
                      "Apply Now"
                    )}
                  </button>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
