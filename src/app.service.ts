import { Injectable } from '@nestjs/common';
import { AccountService } from 'account/account.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {

  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
    ) { }

  async validateUser(username: string, password: string): Promise<any> {
    const account = await this.accountService.findByEmailAndPassword(username, password);
    if (account) {
      return account;
    }
    return null;
  }

  async login(account: any) {
    const payload = { username: account.username, sub: account._id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  root(): string {
    return 'Authentication Microservice';
  }
}
