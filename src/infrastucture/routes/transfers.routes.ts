import { Router } from "express";
import { makeTransfer, transfersHistory} from "../controllers/transfers.controller";

const route = Router();

route.post('/make', makeTransfer);
route.get('/transfer-history', transfersHistory);

export default route;
