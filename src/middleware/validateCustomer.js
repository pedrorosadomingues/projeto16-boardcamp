import { db } from "../database/database.connection.js";

export async function validateCustomerById(req, res, next) {
  const { id } = req.params;

  try {
    const customer = await db.query("SELECT * FROM customers WHERE id = $1", [
      id,
    ]);
    if (!customer.rows.length) {
      return res.sendStatus(404);
    }
    res.locals.customer = customer.rows[0];
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}