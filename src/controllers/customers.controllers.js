import { db } from "../database/database.connection.js";

export async function getCustomers(req, res) {
  try {
    const customers = await db.query("SELECT * FROM customers");
    res.status(200).send(customers.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}

export async function insertCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;

  try {
    const customer = await db.query(
      "INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)",
      [name, phone, cpf, birthday]
    );
    res.status(201).send(customer.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}

export async function getCustomerById(req, res) {
  
    const { customer } = res.locals;

    res.status(200).send(customer);
    
}
export async function updateCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;
  const { id } = req.params;

  try {
    const customer = await db.query(
      "UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5",
      [name, phone, cpf, birthday, id]
    );
    res.status(200).send(customer.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}

