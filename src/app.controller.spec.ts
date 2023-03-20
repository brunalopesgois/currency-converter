import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  const config = () => {
    const server = {
      name: 'converter-service',
      version: faker.system.semver(),
      environment: 'test',
    };

    return { server };
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [config],
          isGlobal: true,
        }),
      ],
      controllers: [AppController],
      providers: [AppService, ConfigService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return api server info', () => {
      expect(appController.getApiInfo()).toHaveProperty('name');
      expect(appController.getApiInfo()).toHaveProperty('version');
      expect(appController.getApiInfo()).toHaveProperty('environment');
    });
  });
});
