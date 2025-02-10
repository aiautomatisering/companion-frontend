import { Divider } from '@mantine/core';
import { LoginForm } from './_LoginForm';
import { RegisterUserForm } from './_RegisterForm';

export const Login = () => {
  return (
    <div className="flex-1">
      <LoginForm />
      <Divider my="xs" label="OR" labelPosition="center" />
      <RegisterUserForm />
    </div>
  );
};
