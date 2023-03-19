import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  apiInfo() {
    const server = this.configService.get('server');
    return {
      name: server.name,
      version: server.version,
      environment: server.environment,
    };
  }
}
