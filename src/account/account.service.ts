import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthAccount } from './account.entity';
import { createHmac } from 'crypto';

@Injectable()
export class AccountService {

  constructor(
    @InjectRepository(AuthAccount)
    private readonly authAccountRepository: Repository<AuthAccount>,
  ) { }

  async findAll(): Promise<AuthAccount[] | undefined> {
    return await this.authAccountRepository.find();
  }

  async findOne(username: string): Promise<AuthAccount | undefined> {
    return await this.authAccountRepository.findOne({
      where: {
        username,
      },
    });
  }

  async findByEmailAndPassword(username: string, password: string): Promise<AuthAccount | undefined> {
    return await this.authAccountRepository.findOne({
      username,
      password: createHmac('sha256', password).digest('hex'),
    });
  }

  async create(account: AuthAccount): Promise<AuthAccount | undefined | any> {
    const authAccount = this.authAccountRepository.create(account);
    return await this.authAccountRepository.save(authAccount)
      .catch(({ errmsg }): any => ({ errmsg }));
  }

  async changePassword(account: AuthAccount): Promise<AuthAccount | undefined | any> {
    const { username, password } = account;
    const accountRepo = await this.authAccountRepository.findOne({ username });
    accountRepo.password = password;
    return await this.authAccountRepository.save(accountRepo).catch(({ errmsg }) => ({ errmsg }));
  }
}
