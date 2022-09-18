import { DynamicModule, Module } from '@nestjs/common';
import { newEnforcer } from 'casbin';
import { AuthorizationService } from './authorization.service';
import { AUTHORIZATION_ENFORCER } from './constants/token.const';
import { RegisterOptions } from './models/option.model';

@Module({})
export class AuthorizationModule {
  static register(options: RegisterOptions): DynamicModule {
    const { modelPath, policyAdapter, global = false } = options;
    const providers = [
      {
        provide: AUTHORIZATION_ENFORCER,
        useFactory: async () => {
          const enforcer = await newEnforcer(modelPath, policyAdapter);
          return enforcer;
        },
      },
      AuthorizationService,
    ];

    return {
      global,
      providers,
      module: AuthorizationModule,
      exports: [...providers],
    };
  }
}
