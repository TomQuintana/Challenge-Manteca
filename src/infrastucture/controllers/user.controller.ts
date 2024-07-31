import { Request, Response } from "express";
import { UserAccountService } from "../../service/userAccount.service"

const userService = new UserAccountService();

const createUser = async (req: Request, res: Response) => {

  try {
    const userData = req.body;
    const newUser = await userService.registerUserAccount(userData);

    if (!newUser) {
      return res.status(400).json({
        msg: "The User is already saved"
      });
    }

    return res.send({newUser});
  } catch (error) {
    console.log(error);
  }
}

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userService.verifyUser(email, password);

    if (!user) {
      return res.status(400).json({
        msg: "The User does not exist"
      });
    }

    return res.send({user});
  } catch (error) {
    console.log(error);
  }
}

export {
  createUser,
  login
}
