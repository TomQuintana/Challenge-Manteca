export interface UserAccountRepository {
  createUserAccount(userAccount: any);
  findUserByEmail(email: string);
}
