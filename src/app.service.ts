import { Injectable } from '@nestjs/common';
import { AccountService } from 'account/account.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {

  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
    ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const account = await this.accountService.findOne(username);
    if (account && account.password === pass) {
      const { password, ...result } = account;
      return result;
    }
    return null;

  }

  async login(account: any) {
    const payload = { username: account.username, sub: account.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  root(): string {
    return 'Authentication Microservice';
  }
}
