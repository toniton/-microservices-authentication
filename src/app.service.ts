import { Injectable } from '@nestjs/common';
import { AccountService } from 'account/account.service';

@Injectable()
export class AppService {

  constructor(private readonly accountService: AccountService) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const account = await this.accountService.findOne(username);
    if (account && account.password === pass) {
      const { password, ...result } = account;
      return result;
    }
    return null;

  }

  root(): string {
    return 'Authentication Microservice';
  }
}
