import { BaseRoleResponse } from './role.type';

// Requests

export interface SigningRequest {
  email: string;
  password: string;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  roles: string[];
}

// Responses
export interface BaseUserResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  updatedAt: string;
  createdAt: string;
}

export interface UserRoleResponse {
  userId: string;
  roleId: string;
  createdAt: string;
  updatedAt: string;
  role: BaseRoleResponse;
}

export interface UserResponse {
  id: string;
  email: string;
  password: string;
  lastName: string;
  firstName: string;
  updatedAt: string;
  createdAt: string;
  roles: UserRoleResponse[];
}

export interface SigningResponse {
  accessToken: string;
  user: UserResponse;
}
