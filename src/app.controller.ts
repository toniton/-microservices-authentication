import { Get, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  root(): string {
    return this.appService.root();
  }

  @Get('authre')
  @Post('authre')
  auth(): string {
    return this.appService.root();
  }

  @MessagePattern({ cmd: 'sum' })
  async sum(data: number[]): Promise<number> {
    return (data || []).reduce((a, b) => a + b);
  }
}
