import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly appService: AppService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const account = await this.appService.validateUser(username, password);
    if (!account) {
      throw new UnauthorizedException();
    }
    return account;
  }
}