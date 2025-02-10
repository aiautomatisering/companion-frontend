import { SigningResponse } from '../types/user.type';
import BaseService from './base.service';

class Auth extends BaseService {
  async login(user: {
    email: string;
    password: string;
  }): Promise<SigningResponse> {
    const response = await this.axios.post('/auth/signin', user);
    return response.data;
  }
}
export default new Auth();
