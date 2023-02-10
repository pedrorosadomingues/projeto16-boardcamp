import { Router } from "express";
import { getRentals, insertRental, deleteRental, finishRental} from "../controllers/rentals.controllers.js";
import { validateRental } from "../middleware/validateRental.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { rentalSchema } from "../Schema/rentalSchema.js";
import { validateFinishRental } from "../middleware/validateFinishRental.js";

const router = Router();

router.get("/rentals", getRentals); 
router.post("/rentals", validateSchema(rentalSchema), validateRental, insertRental);
router.delete("/rentals/:id", deleteRental);
router.post("/rentals/:id/return", validateFinishRental, finishRental);

export default router;