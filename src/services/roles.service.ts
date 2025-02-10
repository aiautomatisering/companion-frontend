import BaseService from './base.service';
import { BaseRoleResponse } from '../types/role.type';

export class RoleService extends BaseService {
  async getAll(): Promise<BaseRoleResponse[]> {
    const allRoles = await this.axios.get('/role/all');
    return allRoles.data;
  }
}

export default new RoleService();
