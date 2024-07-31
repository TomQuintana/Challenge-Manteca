import { Request, Response } from "express";
import { UserAccountService } from "../../service/userAccount.service"
import { TransferService } from "../../service/transfers.service"


const userService = new UserAccountService();
const transferService = new TransferService();

const makeTransfer = async (req: Request, res: Response) => {
  const token = req.headers['authorization'];
  
  const splitToken = token.split(' ');
  const bearerToken = splitToken[1]
  console.log({ bearerToken });

  const { origin, destination, amount, pinToken, currency, destinationType } = req.body;
  const transfersResult = await transferService.createTransfer(bearerToken, origin, destination, amount, pinToken, currency, destinationType);

  return res.send({"Result of the transfer": transfersResult});
}

const transfersHistory = async (req: Request, res: Response) => {
  const token = req.headers['authorization'];
  
  const splitToken = token.split(' ');
  const bearerToken = splitToken[1]

  const transfersResult = await transferService.showTransferHistory(bearerToken);

  return res.send({"Result of the transfer": transfersResult});
}

export {
  makeTransfer,
  transfersHistory
}
