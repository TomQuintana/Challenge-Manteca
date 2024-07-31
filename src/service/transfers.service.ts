import { AuthService } from "../service/auth.service";
import { UserAccountMongoRepository } from "../../src/infrastucture/repository/mongorepository";
import { UserAccountService } from "../service/userAccount.service";

export class TransferService {
  authService = new AuthService();
  userService = new UserAccountService();
  mongoRepository = new UserAccountMongoRepository();

  public async createTransfer(
    token: any,
    origin: string,
    destination: string,
    amount: Number,
    pinToken: Number,
    currency: string,
  ) {

    const amountNumber: number = Number(amount);

    if (amountNumber >= 1000 && pinToken === undefined) {
      const msg =
        "Para poder realizar transferencias mayores a X pesos se debe requerir un PIN de seguridad";
      const pin = Math.floor(Math.random() * 10000);

      return { Message: msg, Pin: pin, Status: "Pending" };
    }

    const payloadToken = await this.authService.decodedToken(token);

    const userOrigin = await this.getUserByEmail(payloadToken);

    const userAccountOrigin = await this.getUserAccount(
      userOrigin._id,
    );

    const userAccountDestination = await this.getOrigin(destination);

    if (
      amount > userAccountOrigin.balance_ars ||
      amount > userAccountOrigin.balance_usd
    ) {
      const msg = "No puede transferir esa cantidad de dinero";
      return msg;
    }

    const userAccountBalanceArs: number = Number(userAccountOrigin.balance_ars);
    const userAccountBalanceUsd: number = Number(userAccountOrigin.balance_usd);

    const userDestinationAccountBalanceArs: number = Number(
      userAccountDestination.balance_ars,
    );

    const userDestinationAccountBalanceUsd: number = Number(
      userAccountDestination.balance_usd,
    );

    if (isNaN(userAccountBalanceArs) || isNaN(amountNumber) || isNaN(userDestinationAccountBalanceArs) || isNaN(userDestinationAccountBalanceUsd)){
      throw new Error("Balance or amount is not a valid number");
    }

    const modifyBalanceOriginArs = userAccountBalanceArs - amountNumber;

    const modifyBalanceDestinationArs = userDestinationAccountBalanceArs + amountNumber;

    const modifyBalanceOriginUsd = userAccountBalanceUsd - amountNumber;

    const modifyBalanceDestinationUsd = userDestinationAccountBalanceUsd + amountNumber;

    const userIdString = userOrigin._id.toString();
    const userDestinarionIdString = userAccountDestination.userId.toString();

    if (currency === "usd") {
      await this.modifyBalance(userIdString, modifyBalanceOriginUsd, currency);

      await this.modifyBalance(
        userDestinarionIdString,
        modifyBalanceDestinationUsd,
        currency
      );
    } else {
      await this.modifyBalance(userIdString, modifyBalanceOriginArs, currency);

      await this.modifyBalance(
        userDestinarionIdString,
        modifyBalanceDestinationArs,
        currency 
      );
    }

    await this.mongoRepository.creteTransferRecord({
      userId: userAccountOrigin.userId,
      origin: origin,
      destination: destination,
      amount: amount,
      status: "success",
    });

    return {
      msg: "Transferencia realizada con exito",
      balance: currency === "usd" ? `$${modifyBalanceOriginUsd}` : `$${modifyBalanceOriginArs }`,
      amount: `$${ amount }`,
      status: "Success",
    };
  }

  public async showTransferHistory(token: any) {
    const payloadToken = await this.authService.decodedToken(token);

    const user = await this.getUserByEmail(payloadToken);
    const userAccountOrigin = await this.getUserAccount(
      user._id,
    );

    const transferHistory = await this.mongoRepository.showTransfers(
      userAccountOrigin.userId,
    );

    return transferHistory;
  }

  private async getUserByEmail(payload: any) {
    return await this.mongoRepository.findUserByEmail(payload.email);
  }

  private async getUserAccount(userId: any) {
    return await this.mongoRepository.findUserAccountById(userId);
  }

  private async modifyBalance(userId: string, balance: number, currencyType: string) {
    console.log(userId, balance, currencyType);
    
    if (currencyType === "usd") {
      return await this.mongoRepository.updateBalanceUserUsd(userId, balance);
    }
    return await this.mongoRepository.updateBalanceUserArs(userId, balance);
  }

  private async getOrigin(destination: string) {
    const alias = destination
    return await this.mongoRepository.findUserByAliasOrCbu(alias);
  }
 
}
