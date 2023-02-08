import{ db } from "../database/database.connection.js";

export async function validateGame(req, res, next) {
 const { name } = req.body;

 try {
    const game = await db.query("SELECT * FROM games WHERE name = $1", [name]);
    if (game.rows.length) {
        return res.sendStatus(409);
    }
    next();
 } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
 }
    
}