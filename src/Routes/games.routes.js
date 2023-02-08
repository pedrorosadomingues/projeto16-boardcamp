import { Router } from "express";
import { getGames,  insertGame } from "../controllers/games.controllers.js";

const router = Router();

router.get("/games", getGames);
router.post("/games", insertGame);

export default router;