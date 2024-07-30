import userModel from "../models/user.model";
import { UserAccountRepository } from "../../domain/userAccount.repository";

export class UserAccountMongoRepository implements UserAccountRepository {

  async createUserAccount(userAccountEntry: object) {
    const newUserAccount = await userModel.create(userAccountEntry);
    return newUserAccount;
  }

  async findUserByEmail(email: string) {
    const searchedUser = await userModel.findOne({email});
    return searchedUser;
  }
}
