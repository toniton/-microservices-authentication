import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountService } from 'account/account.service';
import { LocalStrategy } from 'local.strategy';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, AccountService, LocalStrategy],
})
export class AppModule {}
