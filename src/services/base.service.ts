import { AxiosInstance } from 'axios';
import { createAxiosInstance } from '../utils/api';

class BaseService {
  urlSufix = '';
  axios: AxiosInstance;

  constructor(_urlSufix = '') {
    this.urlSufix = _urlSufix;
    this.axios = createAxiosInstance({ urlSufix: this.urlSufix });
  }
}

export default BaseService;
