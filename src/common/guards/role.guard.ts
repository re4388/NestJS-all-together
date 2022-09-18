import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../authorization';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private readonly authorizationService: AuthorizationService) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const request: Request = context.switchToHttp().getRequest();


    // not impl authentication, provide fake data to mimic the case after passed
    // the password authentication 
    (request as any).user = { role: 'manager' };

    const { user, path, method } = request as any;
    const action = this.authorizationService.mappingAction(method);

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.authorizationService.checkPermission(
      `role:${user.role}`,
      path,
      action,
    );
  }
}
