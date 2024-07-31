import { Router } from "express";
import { createUser, login} from "../controllers/user.controller";

const route = Router();

route.post('/create', createUser);
route.post('/login', login);

export default route;
