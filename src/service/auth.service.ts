import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class AuthService {

  public async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = bcrypt.hash(password, saltRounds);
    return hashedPassword
  }

  public async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  public async generateToken(email: string, name: string, secretKey: string): Promise<string> {
    const payload = { email, name };

    const token = jwt.sign(payload, secretKey, {
      expiresIn: '1h',
    });

    return token;
  }

  public async verifyToken(token: string, secretKey: string): Promise<any> {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  }

  public async decodedToken(token: string) {
    const decoded = jwt.decode(token);
    return decoded;
  }
}
