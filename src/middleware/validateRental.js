import { db } from "../database/database.connection.js";

export async function validateRental(req, res, next) {
  const { gameId, daysRented, customerId } = req.body;
  if (daysRented < 1) {
    return res.sendStatus(400);
  }
  
  let originalPrice = 0;

    try {
        const gameStock = await db.query("SELECT * FROM rentals WHERE gameId = $1 AND returnDate IS NULL", [gameId]);

        const game = await db.query("SELECT * FROM games WHERE id = $1 AND ", [gameId]);
        if (!game.rows.length) {
            return res.sendStatus(400);
        }

        if (gameStock.rows.length >= game.rows[0].stockTotal) {
            return res.sendStatus(400);
        }

        const customer = await db.query("SELECT * FROM customers WHERE id = $1 AND ", [customerId]);
        if (!customer.rows.length) {
            return res.sendStatus(400);
        }

        originalPrice = game.rows[0].pricePerDay * daysRented;
        res.locals = { originalPrice };
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
        
    

  
}