import { Router } from "express";
import { createUser, login, getUser} from "../controllers/user.controller";

const route = Router();

route.post('/create', createUser);
route.post('/login', login);
route.get('/data', getUser);

export default route;
