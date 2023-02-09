import { Router } from "express";
import { getRentals, insertRental, deleteRental} from "../controllers/rentals.controllers.js";
import { validateRental } from "../middleware/validateRental.js";

const router = Router();

router.get("/rentals", getRentals); 
router.post("/rentals", validateRental, insertRental);
router.delete("/rentals/:id", deleteRental);

export default router;