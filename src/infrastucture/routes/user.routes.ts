import { Router } from "express";
import { UserAccountMongoRepository } from "../repository/mongorepository";
import {UserAccountService} from "../../service/userAccount.service"
import { UserAccountController } from "../controllers/user.controller";

const route = Router();

const userRepo = new UserAccountMongoRepository();
const userAccountService = new UserAccountService(userRepo);
const userAccountCtrl = new UserAccountController(userAccountService);

route.post('/create', userAccountCtrl.createNewUseraccount);

export default route;
