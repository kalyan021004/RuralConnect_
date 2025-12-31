import api from "./axios";

/* =========================
   CITIZEN
========================= */

/* Get all schemes (citizen → only active) */
export const fetchSchemes = () => {
  return api.get("/schemes");
};

/* Get single scheme */
export const getSchemeById = (id) => {
  return api.get(`/schemes/${id}`);
};
export const fetchAllSchemesAdmin = () => api.get("/schemes/admin/all");


/* Check eligibility */
export const checkEligibility = (schemeId) => {
  return api.get(`/schemes/${schemeId}/eligibility`);
};

/* Apply for scheme */
export const applyScheme = (schemeId) => {
  return api.post("/applications/apply", { schemeId });
};


/* =========================
   ADMIN
========================= */

/* Toggle scheme active / inactive */
export const toggleSchemeStatus = (schemeId) => {
  return api.put(`/schemes/${schemeId}/toggle`);
};
