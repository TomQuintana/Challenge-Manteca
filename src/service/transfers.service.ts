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
    currency: Number,
  ) {
    const amountNumber: number = Number(amount);

    if (amountNumber >= 1000 && pinToken === undefined) {
      const msg =
        "Para poder realizar transferencias mayores a X pesos se debe requerir un PIN de seguridad";
      const pin = Math.floor(Math.random() * 10000);

      return { Message: msg, Pin: pin, Status: "Pending" };
    }

    const payloadToken = await this.authService.decodedToken(token);

    const userOrigin = await this.userService.getUserByEmail(payloadToken);
    const userAccountDestination =
      await this.userService.getOrigin(destination);

    const userAccountOrigin = await this.userService.getUserAccount(
      userOrigin._id,
    );

    if (amount > userAccountOrigin.balance_ars) {
      const msg = "No puede transferir esa cantidad de dinero";
      return msg;
    }

    const userAccountBalanceArs: number = Number(userAccountOrigin.balance_ars);
    const userDestinationAccountBalanceArs: number = Number(
      userAccountDestination.balance_ars,
    );

    if (isNaN(userAccountBalanceArs) || isNaN(amountNumber)) {
      throw new Error("Balance or amount is not a valid number");
    }

    const modifyBalanceOrigin = userAccountBalanceArs - amountNumber;
    const modifyBalanceDestination =
      userDestinationAccountBalanceArs + amountNumber;

    const userIdString = userOrigin._id.toString();
    const userDestinarionIdString = userAccountDestination.userId.toString();

    await this.userService.modifyBalance(userIdString, modifyBalanceOrigin);

    await this.userService.modifyBalance(
      userDestinarionIdString,
      modifyBalanceDestination,
    );

    await this.mongoRepository.creteTransferRecord({
      userId: userAccountOrigin.userId,
      origin: origin,
      destination: destination,
      amount: amount,
      status: "success",
    });

    return {
      msg: "Transferencia realizada con exito",
      balance: modifyBalanceOrigin,
      amount: amount,
      status: "Success",
    };
  }
}
