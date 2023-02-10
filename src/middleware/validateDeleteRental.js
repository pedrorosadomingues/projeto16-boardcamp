import { db } from "../database/database.connection.js";

export async function validateDeleteRental(req, res, next) {
    const { id } = req.params;

    try {
        const rental = await db.query("SELECT * FROM rentals WHERE id = $1",  [id] );
        if (!rental.rows.length) {
            return res.sendStatus(404);
        }
        if (!rental.rows[0].returnDate) {
            return res.sendStatus(400);
        }
        res.locals.rental = rental.rows[0];
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}