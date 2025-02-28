import BaseService from './base.service';

export class SubscriptionService extends BaseService {
  async createCheckoutSession(
    planId: string,
    email: string
  ): Promise<{ url: string }> {
    const response = await this.axios.post('/subscriptions/checkout', {
      planId,
      email,
    });
    return response.data;
  }
}

export default new SubscriptionService();
