import { Request, Response } from "express";
import { UserAccountService } from "../../service/userAccount.service"

export class UserAccountController {
  constructor(private userAccountService: UserAccountService) {
    this.createNewUseraccount = this.createNewUseraccount.bind(this);
  }

  public createNewUseraccount = async (req: Request, res: Response) => {
    console.log(req.body);

    try {
      const userData = req.body;
      const newUser = await this.userAccountService.registerUserAccount(userData);

      if (!newUser) {
        return res.status(400).json({
          msg: "The User is already saved"
        });
      }

      console.log(newUser);
      return res.send({newUser});
    } catch (error) {
      console.log(error);
    }
  }

    // try {
    //   const newBook = await this.userAccountService.registerUserAccount(bookData);
    //
  //     if (!newBook) {
  //       return res.status(400).json({
  //         msg: "The book is already saved"
  //       });
  //     }
  //
  //     return res.send({newBook});
  //
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
}
