import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, Button, Container, Paper, Title, Loader } from '@mantine/core';
import * as yup from 'yup';
import { SigningRequest } from '../../types/user.type';
import authService from '../../services/auth.service';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { UserRoleEnum } from '../../types/role.type';
import { AuthContext } from '../../context/AuthContext';
import { LoadingWrapper } from '../../layouts/LoadingWrapper';
import { toast } from 'react-toastify';

// Define validation schema using Yup
const schema = yup
  .object({
    email: yup
      .string()
      .email('Invalid email format')
      .required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  })
  .required();

// Define form values type
type FormValues = {
  email: string;
  password: string;
};

export const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const { handleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  // Services
  const { mutate, isPending } = useMutation({
    mutationKey: ['login'],
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      return await authService.login({ email, password });
    },
    onSuccess(auth) {
      handleLogin({
        accessToken: auth?.accessToken,
        user: auth.user,
      });
      toast.success(`Welcome ${auth.user.firstName} ${auth.user.lastName}!`);
      if (auth.user && auth.user.roles[0].role.name === UserRoleEnum.USER)
        navigate('/');

      if (auth.user && auth.user.roles[0].role.name === UserRoleEnum.ADMIN)
        navigate('/users');
    },
  });

  // Handlers
  const onSubmit = (data: SigningRequest) => {
    mutate(data);
  };

  if (isPending) {
    return (
      <LoadingWrapper>
        <Loader size={46} />;
      </LoadingWrapper>
    );
  }
  return (
    <Container size="sm">
      <Paper shadow="md" p="lg" radius="md">
        <Title order={2} mb="md">
          Sign in
        </Title>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Email Input */}
          <Input.Wrapper
            label="Email Address"
            description="Enter your email"
            error={errors.email?.message}
          >
            <Input
              {...register('email')}
              type="email"
              placeholder="john@example.com"
            />
          </Input.Wrapper>

          {/* Password Input */}
          <Input.Wrapper
            label="Password"
            description="Enter a secure password"
            error={errors.password?.message}
          >
            <Input
              {...register('password')}
              type="password"
              placeholder="••••••••"
            />
          </Input.Wrapper>

          {/* Submit Button */}
          <Button type="submit" color="blue" fullWidth mt="md">
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
};
