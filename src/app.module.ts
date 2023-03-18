import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import environment from './config/environment';
import { CurrencyModule } from './currencies/modules/currency.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [environment],
      cache: true,
      isGlobal: true,
    }),
    CurrencyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
