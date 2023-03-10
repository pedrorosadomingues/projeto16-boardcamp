import { db } from "../database/database.connection.js";

export async function getGames(req, res) {
  try {
    const games = await db.query("SELECT * FROM games");
    res.status(200).send(games.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}

export async function insertGame(req, res) {
  const { name, image, stockTotal, pricePerDay } = req.body;

  try {
    await db.query(
      "INSERT INTO games (name, image, \"stockTotal\", \"pricePerDay\") VALUES ($1, $2, $3, $4)",
      [name, image, stockTotal, pricePerDay]
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}