import { Router } from "express";
import { getRentals, insertRental} from "../controllers/rentals.controllers.js";

const router = Router();

router.get("/rentals", getRentals); 
router.post("/rentals", insertRental);

export default router;