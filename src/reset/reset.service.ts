import { Injectable, Logger } from '@nestjs/common';
import { AuthAccount } from 'account/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResetEntity } from './reset.entity';
import { createHash } from 'crypto';

@Injectable()
export class ResetService {

    constructor(
        @InjectRepository(ResetEntity)
        private readonly resetEntityRepository: Repository<ResetEntity>,
        @InjectRepository(AuthAccount)
        private readonly authAccountRepository: Repository<AuthAccount>,
    ) { }

    async resetAccount(account: AuthAccount): Promise<ResetEntity | undefined | any> {
        let resetEntity = await this.resetEntityRepository.findOne({
            where: { account }, relations: ['account'],
        });
        if (!resetEntity){
            resetEntity = new ResetEntity();
        }
        new Logger().log(account, 'Err');
        resetEntity.account = account;
        resetEntity.resetToken = createHash('sha256').update(new Date().toISOString() + Math.random().toString()).digest('hex');
        resetEntity.expiryDate = new Date(new Date(Date.now()).getTime() + 3 * 86400000);
        new Logger().log(resetEntity, 'Token');
        return await this.authAccountRepository.save(resetEntity).catch(({ errmsg }) => ({ errmsg }));
    }
}
