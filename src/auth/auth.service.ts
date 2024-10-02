import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {
  private users: User[] = [];

  constructor(private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = this.users.find((user) => user.username === username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      return user;
    }
    return null;
  }

  async signUp(username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: this.users.length + 1,
      username,
      password: hashedPassword,
    };
    this.users.push(newUser);
    return newUser;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
