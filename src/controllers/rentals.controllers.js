import { db } from "../database/database.connection.js";
import dayjs from "dayjs";

export async function getRentals(req, res) {
 try {
    const rentals = await db.query("SELECT rentals.*, customers.name AS \"customerName\", games.name AS \"gameName\" FROM rentals INNER JOIN customers ON rentals.\"customerId\" = customers.id INNER JOIN games ON rentals.\"gameId\" = games.id");
    let returnRentals = rentals.rows.map((rental) => {
        const { id, customerId, gameId, daysRented, rentDate, returnDate, originalPrice, delayFee, customerName, gameName } = rental;
        return {
            id,
            customerId,
            gameId,
            daysRented,
            rentDate,
            returnDate,
            originalPrice,
            delayFee,
            customer: {
                id: customerId,
                name: customerName,
            },
            game: {
                id: gameId,
                name: gameName,
            },
        }});
    res.status(200).send(returnRentals);
 } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
 }
}

export async function insertRental(req, res) {
    const { customerId, gameId, daysRented } = req.body;
    const rentDate = dayjs().format("YYYY-MM-DD");
    const { originalPrice } = res.locals;

    try {
        const rental = await db.query(
        "INSERT INTO rentals (\"customerId\", \"gameId\", \"daysRented\", \"rentDate\", \"returnDate\", \"originalPrice\", \"delayFee\") VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [customerId, gameId, daysRented, rentDate, null, originalPrice, null]
        );
        res.status(201).send(rental.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}

export async function deleteRental(req, res) {
    const { id } = req.params;

    try {
        const rental = await db.query("DELETE FROM rentals WHERE id = $1", [id]);
        res.status(200).send(rental.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}