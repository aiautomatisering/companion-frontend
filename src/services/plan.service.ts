import BaseService from './base.service';
import { BasePlanResponse, CreatePlanRequest } from '../types/type.type';

export class PlanService extends BaseService {
  async createPlan(planData: CreatePlanRequest): Promise<BasePlanResponse> {
    const response = await this.axios.post('/plan', planData);
    return response.data;
  }

  async getPlan(): Promise<BasePlanResponse[]> {
    const response = await this.axios.get(`/plan/all`);
    return response.data;
  }
}

export default new PlanService();
