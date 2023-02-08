import { Router } from "express";
import { getGames,  insertGame } from "../controllers/games.controllers.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { gameSchema } from "../Schema/gamesSchema.js";
import { validateGame } from "../middleware/validateGame.js";


const router = Router();

router.get("/games", getGames);
router.post("/games", validateSchema(gameSchema), validateGame, insertGame);

export default router;