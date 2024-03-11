import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { RoleType } from 'src/constants/role-type';

export const ROLES_KEY = 'roles';

export function Roles(roles: RoleType[]): CustomDecorator<string> {
  return SetMetadata(ROLES_KEY, roles);
}
