import { db } from "../database/database.connection.js";

export async function validateCpfById(req, res, next) {
  const { id } = req.params;
  const { cpf } = req.body;

  try {
    const customer = await db.query(
      "SELECT * FROM customers WHERE id != $1 AND cpf = $2",
      [id, cpf]
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