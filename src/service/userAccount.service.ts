import { UserAccountMongoRepository } from "../infrastucture/repository/mongorepository";
import { AuthService } from "./auth.service";

export class UserAccountService {
  mongoRepository = new UserAccountMongoRepository();
  authService = new AuthService();

  public async registerUserAccount(userData: any) {
    const verifyIfUserExist = await this.isUserExisted(userData.email);

    if (verifyIfUserExist) {
      console.log("El usuario ya existe");
      return verifyIfUserExist;
    }

    userData.password = await this.authService.hashPassword(userData.password);

    const user = await this.mongoRepository.createUser(userData);

    const userAccount = {
      email: userData.email,
      name: userData.name,
      dni: userData.dni,
      alias: "",
      cbu: "",
      userId: user._id,
    };


    const userCbu = await this.generateUserAccountNumber(12);
    const alias = await this.generteRandomAlias();

    userAccount.cbu = userCbu.toString();
    userAccount.alias = alias;

    await this.mongoRepository.createUserAccount(userAccount);

    return user;
  }

  private async isUserExisted(title: string): Promise<boolean> {
    const existingUser = await this.mongoRepository.findUserByEmail(title);
    return !!existingUser;
  }

  private async generateUserAccountNumber(longitud: number) {
    let id = "";
    for (let i = 0; i < longitud; i++) {
      id += Math.floor(Math.random() * 10); // Añade un dígito aleatorio
    }
    //TODO: pasar a string
    return id;
  }

  private async generteRandomAlias() {
    const palabras = [
      "Aventura",
      "Rosa",
      "Mar",
      "Lago",
      "Sol",
      "Luna",
      "Bosque",
      "Nube",
      "Estrella",
      "Oceano",
      "Río",
      "Cielo",
      "Flor",
      "Montaña",
      "Rayo",
      "Viento",
      "Nieve",
      "Mariposa",
      "Tronco",
      "Hoja",
    ];

    const getRamdonWorld = (array: string[]): string => {
      const indice = Math.floor(Math.random() * array.length);
      return array[indice];
    };

    const world1 = getRamdonWorld(palabras);
    const world2 = getRamdonWorld(palabras);

    return `${world1}.${world2}`;
  }

  public async verifyUser(email: string, password: string) {
    const user = await this.mongoRepository.findUserByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await this.authService.verifyPassword(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      return null;
    }

    const secretKey = process.env.SECRECT_KEY || "secret";

    const token = await this.authService.generateToken(
      user.email,
      user.name,
      secretKey,
    );

    return token;
  }

  public async getUserByEmail(payload: any) {
    return await this.mongoRepository.findUserByEmail(payload.email);
  }

  public async getUserAccount(userId: any) {
    return await this.mongoRepository.findUserAccountById(userId);
  }

  public async getOrigin(destination: string) {
    const alias = destination
    return await this.mongoRepository.findUserByAliasOrCbu(alias);
  }

  public async modifyBalance(userId: string, balance: number, currencyType: string) {
    console.log();
    
    if (currencyType === "usd") {
      return await this.mongoRepository.updateBalanceUserUsd(userId, balance);
    }
    return await this.mongoRepository.updateBalanceUserArs(userId, balance);
  }
}
