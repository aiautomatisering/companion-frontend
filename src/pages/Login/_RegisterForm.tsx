import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, Button, Container, Paper, Title, Loader } from '@mantine/core';
import * as yup from 'yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import { BaseRoleResponse, UserRoleEnum } from '../../types/role.type';
import rolesService from '../../services/roles.service';
import { CreateUserRequest } from '../../types/user.type';
import usersService from '../../services/users.service';
import { toast } from 'react-toastify';
import { LoadingWrapper } from '../../layouts/LoadingWrapper';

// Define form values type

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
    firstName: yup
      .string()
      .max(60, 'First name cannot exceed 60 characters')
      .required('First name is required'),
    lastName: yup
      .string()
      .max(60, 'Last name cannot exceed 60 characters')
      .required('Last name is required'),
    roles: yup.array().of(yup.string().required()).default([]), // Ensure roles are always strings
  })
  .required();

export const RegisterUserForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateUserRequest>({
    resolver: yupResolver(schema),
  });

  const { data } = useQuery<BaseRoleResponse[], Error>({
    queryKey: ['roles'],
    queryFn: async () => await rolesService.getAll(),
  });

  if (data) {
    const userRole = data.find(({ name }) => name === UserRoleEnum.USER);
    if (userRole?.id) setValue('roles', [userRole.id]);
  }

  // Mutation to create user
  const { mutate, isPending } = useMutation({
    mutationKey: ['createUser'],
    mutationFn: async (data: CreateUserRequest) => {
      return await usersService.create(data);
    },
    onSuccess: (user) => {
      toast.success(
        `Successfully registered ${user.firstName} ${user.lastName}! 🎉`
      );
    },
  });

  // Submit handler
  const onSubmit = (data: CreateUserRequest) => {
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
          Sign up
        </Title>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input.Wrapper label="First Name" error={errors.firstName?.message}>
            <Input {...register('firstName')} placeholder="John" />
          </Input.Wrapper>

          <Input.Wrapper label="Last Name" error={errors.lastName?.message}>
            <Input {...register('lastName')} placeholder="Doe" />
          </Input.Wrapper>

          <Input.Wrapper label="Email Address" error={errors.email?.message}>
            <Input
              {...register('email')}
              type="email"
              placeholder="john@example.com"
            />
          </Input.Wrapper>

          <Input.Wrapper label="Password" error={errors.password?.message}>
            <Input
              {...register('password')}
              type="password"
              placeholder="••••••••"
            />
          </Input.Wrapper>

          <Button
            type="submit"
            color="blue"
            fullWidth
            mt="md"
            disabled={isPending}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
};
