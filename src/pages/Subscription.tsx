import { SimpleGrid, Switch, Text } from '@mantine/core';
import SubscribeCard from '../common/components/SubscribeCard/SubscribeCard';
import { useEffect, useState } from 'react';
import planService from '../services/plan.service';
import { useQuery } from '@tanstack/react-query';
import { BasePlanResponse, Interval } from '../types/type.type';

export const Subscription = () => {
  const [plans, setPlans] = useState<BasePlanResponse[]>([]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['plans'],
    queryFn: async () => await planService.getPlan(),
  });

  const handleOnInterval = (e: React.ChangeEvent<HTMLInputElement>) => {
    const annualChecked = e.target.checked;

    const planState =
      data?.filter(
        ({ interval }) =>
          interval === (annualChecked ? Interval.YEARLY : Interval.MONTHLY)
      ) || [];

    setPlans(planState);
  };

  useEffect(() => {
    if (data?.length)
      setPlans(data?.filter(({ interval }) => interval === Interval.MONTHLY));
  }, [data]);

  if (isLoading) return <p>Loading plans...</p>;
  if (isError) return <p>Failed to fetch plans.</p>;

  return (
    <>
      <div className="w-full flex justify-center gap-1">
        <Text>Monthly</Text>
        <Switch onChange={handleOnInterval} />
        <Text>Yearly</Text>
      </div>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {plans?.map((plan) => <SubscribeCard key={plan.id} {...plan} />)}
      </SimpleGrid>
    </>
  );
};
