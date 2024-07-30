import {UserAccountRepository} from "../domain/userAccount.repository";

export class UserAccountService {
  constructor(private readonly userAccountRepository: UserAccountRepository) {}

  public async registerUserAccount(userAccountData: any) {
    const verifyIfUserExist = await this.isUserExisted(userAccountData.email);
    
    if (verifyIfUserExist) {
      console.log('El usuario ya existe');
      return verifyIfUserExist
    }

    const userAccountNumber = await this.generateUserAccountNumber(12);
    const alias = await this.generteRandomAlias();
    
    userAccountData.accountNumber = userAccountNumber;
    userAccountData.alias = alias;

    return this.userAccountRepository.createUserAccount(userAccountData);
  }

  private async isUserExisted(title: string): Promise<boolean> {
    const existingUser = await this.userAccountRepository.findUserByEmail(title);
    return !!existingUser;
  }

  private async generateUserAccountNumber(longitud: number) {
    let id = '';
    for (let i = 0; i < longitud; i++) {
      id += Math.floor(Math.random() * 10); // Añade un dígito aleatorio
    }
    return id;
  }

  private async generteRandomAlias() {
    const palabras = [
      'Aventura', 'Rosa', 'Mar', 'Lago', 'Sol', 'Luna', 'Bosque', 'Nube', 'Estrella', 'Oceano',
      'Río', 'Cielo', 'Flor', 'Montaña', 'Rayo', 'Viento', 'Nieve', 'Mariposa', 'Tronco', 'Hoja'
    ];

    const getRamdonWorld = (array: string[]): string => {
      const indice = Math.floor(Math.random() * array.length);
      return array[indice];
    };

    const world1= getRamdonWorld(palabras);
    const world2= getRamdonWorld(palabras);

    return `${world1}.${world2}`;
  }
}
