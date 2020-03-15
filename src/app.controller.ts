import { Get, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AccountService } from 'account/account.service';
// import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly accountService: AccountService,
  ) { }

  @Get()
  root(): string {
    return this.appService.root();
  }

  @UseGuards(AuthGuard('local'))
  @Post('servicelogin')
  async servicelogin(@Request() req): Promise<any> {
    return this.appService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('account')
  getAccount(@Request() req) {
    return req.user;
  }

  @Post('servicesignup')
  createAccount(@Request() req) {
    return this.accountService.create(req.body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('changepassword')
  changePassword(@Request() req) {
    return this.accountService.changePassword(req.body);
  }

  @Get('accounts')
  getAllAccount() {
    return this.accountService.findAll();
  }

  // @MessagePattern({ cmd: 'sum' })
  // async sum(data: number[]): Promise<number> {
  //   return (data || []).reduce((a, b) => a + b);
  // }
}
