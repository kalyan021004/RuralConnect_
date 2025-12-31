import express from "express";
import { getAllSchemes, createScheme,getSchemeById ,toggleSchemeStatus} from "../controllers/schemeController.js";
import auth from "../middleware/auth.middleware.js";
import role from "../middleware/role.middleware.js";
import { getAllSchemesAdmin } from "../controllers/schemeController.js";
const router = express.Router();

router.get("/", auth, getAllSchemes);
router.post("/", auth, role("state_admin"), createScheme);
router.get("/:id", auth, getSchemeById);
router.put("/:id/toggle", auth, role("state_admin"), toggleSchemeStatus);
router.get("/admin/all", auth, role("state_admin"), getAllSchemesAdmin);




export default router;
