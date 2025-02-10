import { useQuery } from '@tanstack/react-query';
import { Table } from '@mantine/core';
import usersService from '../services/users.service';

export const Users = () => {
  // Fetch users using React Query
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['users'],
    queryFn: async () => await usersService.getAll(),
  });

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Failed to fetch users.</p>;

  // Format data for Mantine Table
  const tableData = {
    caption: 'User List',
    head: ['First Name', 'Last Name', 'Email', 'Role'],
    body: users?.map((user) => [
      user.firstName,
      user.lastName,
      user.email,
      user.roles.map((r) => r.role.name).join(', '),
    ]),
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Users</h1>
      <Table highlightOnHover withColumnBorders data={tableData} />
    </div>
  );
};
