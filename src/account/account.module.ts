import { Module } from '@nestjs/common';
import { AccountService } from 'account/account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthAccount } from 'account/account.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthAccount]),
  ],
  exports: [TypeOrmModule, AccountService],
  providers: [ AccountService ],
})
export class AuthAccountModule { }
