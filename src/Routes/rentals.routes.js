import { Router } from "express";
import { getRentals, insertRental, deleteRental} from "../controllers/rentals.controllers.js";
import { validateRental } from "../middleware/validateRental.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { rentalSchema } from "../Schema/rentalSchema.js";

const router = Router();

router.get("/rentals", getRentals); 
router.post("/rentals", validateSchema(rentalSchema), validateRental, insertRental);
router.delete("/rentals/:id", deleteRental);

export default router;