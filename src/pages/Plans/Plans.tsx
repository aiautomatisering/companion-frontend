import { PlansForm } from './PlanForm';
import { useRef } from 'react';
import { PlansHandle } from './PlanForm';
import { useQuery } from '@tanstack/react-query';
import planService from '../../services/plan.service';
import { Table } from '@mantine/core';

export const Plans = () => {
  const modalRef = useRef<PlansHandle>(null);

  const {
    data: plans,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['plans'],
    queryFn: async () => await planService.getPlan(),
  });

  if (isLoading) return <p>Loading plans...</p>;
  if (isError) return <p>Failed to fetch plans.</p>;

  // Format data for Mantine Table
  const tableData = {
    caption: 'Plans List',
    head: ['ID', 'Name', 'Price ID', 'Interval'],
    body: plans?.map((plan) => [
      plan.id,
      plan.name,
      plan.priceId,
      plan.interval,
    ]),
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Plans</h1>
      <Table highlightOnHover withColumnBorders data={tableData} />
      <PlansForm ref={modalRef} />
    </div>
  );
};
