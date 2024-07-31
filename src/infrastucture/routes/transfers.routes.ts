import { Router } from "express";
import { makeTransfer } from "../controllers/transfers.controller";

const route = Router();

route.post('/make', makeTransfer);

export default route;
