import { Divider, Title } from '@mantine/core';
import { LoginForm } from './_LoginForm';
import { RegisterUserForm } from './_RegisterForm';

export const Login = () => {
  return (
    <div className="flex-1 h-full">
      <Title className="flex justify-center">Welcome</Title>
      <LoginForm />
      <Divider size="md" my="xs" label="OR" labelPosition="center" />
      <RegisterUserForm />
    </div>
  );
};
