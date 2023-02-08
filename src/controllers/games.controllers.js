import { db } from "../database/database.connection.js";

export async function getGames(req, res) {
  try {
    const games = await db.query("SELECT * FROM games");
    res.send(games.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}

export async function insertGame(req, res) {
  const { name, image, stockTotal, pricePerDay } = req.body;

  try {
    const game = await db.query(
      "INSERT INTO games (name, image, \"stockTotal\", \"pricePerDay\") VALUES ($1, $2, $3, $4)",
      [name, image, stockTotal, pricePerDay]
    );
    res.send(game.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}