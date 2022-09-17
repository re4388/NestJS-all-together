import { applyDecorators, UseGuards } from '@nestjs/common';
import { RoleGuard } from '../guards/role.guard';
import { AuthSimpleGuard } from '../guards/auth-simple.guard';
import { Roles } from './roles.decorator';

export const Auth = (...roles: string[]) => applyDecorators(
    Roles(...roles),
    UseGuards(AuthSimpleGuard, RoleGuard)
);