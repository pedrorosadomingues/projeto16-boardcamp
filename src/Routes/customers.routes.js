import { Router } from "express";
import { getCustomers, insertCustomer, updateCustomer, getCustomerById } from "../controllers/customers.controllers.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { customerSchema } from "../Schema/customersSchema.js";
import { validateCpf } from "../middleware/validateCpf.js";
import { validateCustomerById } from "../middleware/validateCustomer.js";

const router = Router();

router.get("/customers", getCustomers);
router.post("/customers", validateSchema(customerSchema), validateCpf, insertCustomer);
router.put("/customers/:id", updateCustomer);
router.get("/customers/:id", validateCustomerById, getCustomerById)

export default router;