import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResetEntity } from './reset.entity';
import { ResetService } from './reset.service';
import { AuthAccount } from 'account/account.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ResetEntity, AuthAccount]),
    ],
    exports: [TypeOrmModule, ResetService],
    providers: [ResetService],
})
export class ResetModule { }
