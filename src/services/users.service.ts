import { CreateUserRequest, UserResponse } from '../types/user.type';

import BaseService from './base.service';

export class UserService extends BaseService {
  async create(payload: CreateUserRequest): Promise<UserResponse> {
    const user = await this.axios.post('/user', payload);
    return user.data;
  }

  async getAll(): Promise<UserResponse[]> {
    const users = await this.axios.get('user/all');
    return users.data;
  }
}

export default new UserService();
