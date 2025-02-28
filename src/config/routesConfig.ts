// Types
import { UserRoleEnum } from '../types/role.type';

// Declare interfaces
export interface ConfigRoute {
  path: string;
  roles: UserRoleEnum[];
}

export type ConfigRoutes = Record<string, Record<string, ConfigRoute>>;

// Config
export const routes: ConfigRoutes = {
  auth: {
    signIn: {
      path: '/login',
      roles: [],
    },
  },
  userPage: {
    home: {
      path: '/',
      roles: [UserRoleEnum.USER],
    },
    chatBot: {
      path: 'chatbot',
      roles: [UserRoleEnum.USER],
    },
    subscription: {
      path: 'subscription',
      roles: [UserRoleEnum.USER],
    },
    users: {
      path: 'users',
      roles: [UserRoleEnum.ADMIN],
    },
    'chatbot-settings': {
      path: 'chatbot-settings',
      roles: [UserRoleEnum.ADMIN],
    },
    checkout: {
      path: 'checkout',
      roles: [UserRoleEnum.USER],
    },
    plans: {
      path: 'plans',
      roles: [UserRoleEnum.ADMIN],
    },
    success: {
      path: 'success',
      roles: [UserRoleEnum.USER],
    },
  },
};
