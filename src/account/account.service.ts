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
    return this.authAccountRepository.find();
  }

  async findOne(username: string): Promise<AuthAccount | undefined> {
    return this.authAccountRepository.findOne({
      where: {
        username,
      },
    });
  }

  async findByEmailAndPassword(username: string, password: string): Promise<AuthAccount | undefined> {
    return this.authAccountRepository.findOne({
      username,
      password: createHmac('sha256', password).digest('hex'),
    });
  }

  async create(account: AuthAccount): Promise<AuthAccount | undefined | any> {
    const authAccount = this.authAccountRepository.create(account);
    return await this.authAccountRepository.save(authAccount)
      .catch(({ errmsg }): any => ({ errmsg }));
  }

  async changePassword(account: AuthAccount & { newpassword: string}) {
    const { username, newpassword } = account;
    // throw new Error('Method not implemented.');
    return this.authAccountRepository.update({
      username,
    }, { password: newpassword });
  }
}
