import { Router } from "express";
import { getGames,  insertGame } from "../controllers/games.controllers.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { gameSchema } from "../Schema/gamesSchema.js";


const router = Router();

router.get("/games", getGames);
router.post("/games", validateSchema(gameSchema), insertGame);

export default router;