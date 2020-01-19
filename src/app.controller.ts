import { Get, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
// import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  root(): string {
    return this.appService.root();
  }

  @UseGuards(AuthGuard('local'))
  @Post('servicelogin')
  async servicelogin(@Request() req): Promise<any> {
    return req.user;
  }

  // @MessagePattern({ cmd: 'sum' })
  // async sum(data: number[]): Promise<number> {
  //   return (data || []).reduce((a, b) => a + b);
  // }
}
