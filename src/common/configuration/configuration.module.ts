import { DynamicModule, Module } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';
import { ENV_PATH } from './constants/token.const';

@Module({
  providers: [ConfigurationService]
})
export class ConfigurationModule {

  static forRoot(options: { path: string }): DynamicModule {
    return {
      providers: [
        {
          provide: ENV_PATH,
          useValue: options.path
        },
        ConfigurationService
      ],


      exports: [
        ConfigurationService
      ],

      module: ConfigurationModule,
      global: true
    };
  }


}
