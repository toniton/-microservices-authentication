import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocalStrategy } from 'local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthAccountModule } from 'account/account.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    PassportModule,
    JwtModule.register({
      secret: 'jwtConstants.secret',
      signOptions: { expiresIn: '60s' },
    }),
    AuthAccountModule,
  ],
  controllers: [AppController],
  providers: [AppService, LocalStrategy, JwtStrategy],
})
export class AppModule { }
