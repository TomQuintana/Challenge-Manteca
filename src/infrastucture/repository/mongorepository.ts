import { UserAccountRepository } from "../../domain/userAccount.repository";
import userModel from "../models/user.model";
import userAccountModel from "../models/userAccount.model";
import transferModel from "../models/transfers.model";

export class UserAccountMongoRepository implements UserAccountRepository {

  async createUser(userEntry: object) {
    const newUserAccount = await userModel.create(userEntry);
    return newUserAccount;
  }

  async createUserAccount(userAccountEntry: object) {
    const newUserAccount = await userAccountModel.create(userAccountEntry);
    return newUserAccount;
  }

  async findUserByEmail(email: string) {
    const searchedUser = await userModel.findOne({email});
    return searchedUser;
  }

  async findUserAccountById(userId: string) {
    const userAccount = await userAccountModel.findOne({userId});
    return userAccount
  }

  async findUserByAliasOrCbu(alias: string) {
    const userDestination = await userAccountModel.findOne({alias});
    return userDestination 
  }

  async updateBalanceUser (userId: string, newBalance: number) {
    const userAccount = await userAccountModel.findOneAndUpdate({userId}, {balance_ars: newBalance});
    return userAccount;
  }

  async creteTransferRecord(transferEntry: object) {
    const newTransfer = await transferModel.create(transferEntry);
    return newTransfer;
  }
}
