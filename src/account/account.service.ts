import { Injectable } from '@nestjs/common';

export type AuthAccount = any;

@Injectable()
export class AccountService {
  private readonly accounts: AuthAccount[];

  constructor() {
    this.accounts = [
      {
        userId: 1,
        username: 'john',
        password: 'changeme',
      },
      {
        userId: 2,
        username: 'chris',
        password: 'secret',
      },
      {
        userId: 3,
        username: 'maria',
        password: 'guess',
      },
    ];
  }

  async findOne(username: string): Promise<AuthAccount | undefined> {
    return this.accounts.find(account => account.username === username);
  }
}
