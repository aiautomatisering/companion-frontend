export enum UserRoleEnum {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface BaseRoleResponse {
  id: string;
  name: UserRoleEnum;
  createdAt: string;
  updatedAt: string;
}
