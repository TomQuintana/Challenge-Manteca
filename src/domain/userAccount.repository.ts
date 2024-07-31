export interface UserAccountRepository {
  createUserAccount(userAccount: any);
  createUser(user: any);
  findUserByEmail(email: string);
}
