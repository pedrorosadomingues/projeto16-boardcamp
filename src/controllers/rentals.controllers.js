import { db } from "../database/database.connection.js";
import dayjs from "dayjs";

export async function getRentals(req, res) {
 try {
    const rentals = await db.query("SELECT * FROM rentals");
    res.status(200).send(rentals.rows);
 } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
 }
}

export async function insertRental(req, res) {
    const { customerId, gameId, daysRented } = req.body;
    const rentDate = dayjs().format("YYYY-MM-DD");

    try {
        const rental = await db.query(
        "INSERT INTO rentals (\"customerId\", \"gameId\", \"daysRented\", \"rentDate\", \"returnDate\", \"originalPrice\", \"delayFee\") VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [customerId, gameId, daysRented, rentDate, null, 10, null]
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