import { db } from "../database/database.connection.js";
import dayjs from "dayjs";

export async function validateFinishRental(req, res, next) {
    const { id } = req.params;
    const returnDate = dayjs().format("YYYY-MM-DD");
    let delayDays = 0;
    let delayPrice = 0;
    try {
        const rental = await db.query("SELECT rentals.*, games.\"pricePerDay\" FROM rentals JOIN games ON rentals.\"gameId\" = games.id WHERE rentals.id = $1 ", [id]);
        if (!rental.rows.length) {
            return res.sendStatus(404);
        }
        if (rental.rows[0].returnDate) {
            return res.sendStatus(400);
        }
        delayDays = dayjs(returnDate).diff(rental.rows[0].rentDate, "day") - rental.rows[0].daysRented;
        if (delayDays < 0) {
            delayDays = 0;
        }
        delayPrice = delayDays * rental.rows[0].pricePerDay;

        res.locals = { delayPrice, returnDate, delayDays };
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}