import { Get, Controller, Post, Request, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AccountService } from 'account/account.service';
import { ResetService } from 'reset/reset.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly accountService: AccountService,
    private readonly resetService: ResetService,
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
  async changePassword(@Request() req) {
    const { username } = req.user;
    const { password } = req.body;
    const account = await this.accountService.findByEmailAndPassword(username, password);
    if (account) {
      throw new HttpException('You are not allowed to reuse your old password', HttpStatus.FORBIDDEN);
    }
    return this.accountService.changePassword({...req.body, username});
  }

  @Get('accounts')
  getAllAccount() {
    return this.accountService.findAll();
  }

  @Post('reset')
  async resetAccount(@Request() req) {
    const { username } = req.body;
    const account = await this.accountService.findOne(username);
    if (!account) {
      throw new HttpException('Account not found', HttpStatus.FORBIDDEN);
    }
    return this.resetService.resetAccount(account);
  }

  // @MessagePattern({ cmd: 'sum' })
  // async sum(data: number[]): Promise<number> {
  //   return (data || []).reduce((a, b) => a + b);
  // }
}
