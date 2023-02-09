import { db } from "../database/database.connection.js";

export async function validateCpf(req, res, next) {
  const { cpf } = req.body;
  try {
    const customer = await db.query(
      "SELECT * FROM customers WHERE cpf = $1",
      [cpf]
    );
    
    if (customer.rows.length) {
      return res.sendStatus(409);
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}