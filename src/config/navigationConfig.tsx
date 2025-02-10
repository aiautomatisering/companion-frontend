// Import types
import { ReactElement } from 'react';
import { UserRoleEnum } from '../types/role.type';
// import { ReactComponent as MemberIcon } from 'assets/icons/common/member.svg';

export interface MainNavigationItem {
  title: string;
  to: string;

  icon?: ({ stroke }: { stroke: string }) => ReactElement;
  roles: UserRoleEnum[];
}

export const mainNavigationConfig: MainNavigationItem[] = [
  {
    title: 'Home',
    to: '/',
    roles: [UserRoleEnum.USER],
  },
  {
    title: 'ChatBot',
    to: '/chatbot',
    roles: [UserRoleEnum.USER],
  },
  {
    title: 'Subscription',
    to: '/subscription',
    roles: [UserRoleEnum.USER],
  },
  {
    title: 'Users',
    to: '/users',
    roles: [UserRoleEnum.ADMIN],
  },
  {
    title: 'Chatbot',
    to: '/chatbot-settings',
    roles: [UserRoleEnum.ADMIN],
  },
];
