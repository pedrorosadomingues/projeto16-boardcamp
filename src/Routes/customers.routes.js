import { Router } from "express";
import { getCustomers, insertCustomer, updateCustomer, getCustomerById } from "../controllers/customers.controllers.js";

const router = Router();

router.get("/customers", getCustomers);
router.post("/customers", insertCustomer);
router.put("/customers/:id", updateCustomer);
router.get("/customers/:id", getCustomerById)

export default router;