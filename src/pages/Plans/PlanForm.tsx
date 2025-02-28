import {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
} from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, Button, Modal, Loader, Select } from '@mantine/core';
import * as yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import planService from '../../services/plan.service';
import { toast } from 'react-toastify';
import { useDisclosure } from '@mantine/hooks';
import { CreatePlanRequest, Interval } from '../../types/type.type';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  priceId: yup.string().required('Price ID is required'),
  interval: yup
    .mixed<Interval>()
    .oneOf(Object.values(Interval), 'Invalid interval')
    .required('Interval is required'),
  amount: yup
    .number()
    .min(1, 'Amount must be greater than 0')
    .required('Amount is required'),
  trialDays: yup
    .number()
    .min(0, 'Trial days must be non-negative')
    .typeError('Trial days must be a number')
    .optional(),
});

interface PlanFormValues {
  name: string;
  priceId: string;
  interval: Interval;
  amount: number;
  trialDays?: number;
}

export interface PlansHandle {
  openModal: (data?: unknown) => void;
  closeModal: () => void;
}

const PlansComponent: ForwardRefRenderFunction<PlansHandle> = (_, ref) => {
  const [opened, { open, close }] = useDisclosure(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<PlanFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      priceId: '',
      interval: Interval.MONTHLY,
      amount: 0,
      trialDays: undefined,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['plans'],
    mutationFn: (planData: CreatePlanRequest) =>
      planService.createPlan(planData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plans'] });
      toast.success('Plan created successfully!');
      reset();
      close();
    },
    onError: (error) => {
      console.error('Error creating plan:', error);
      toast.error('Failed to create plan');
    },
  });

  const onSubmit = async (data: PlanFormValues) => {
    mutate(data);
  };

  useImperativeHandle(ref, () => ({
    openModal: (data) => {
      console.log('Received data on openModal:', data);
      open();
    },
    closeModal: close,
  }));

  return (
    <div>
      <Modal opened={opened} onClose={close} title="Create Plan">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input.Wrapper label="Plan Name" error={errors.name?.message}>
            <Input {...register('name')} placeholder="Basic Plan" />
          </Input.Wrapper>

          <Input.Wrapper label="Price ID" error={errors.priceId?.message}>
            <Input {...register('priceId')} placeholder="stripe_price_id" />
          </Input.Wrapper>

          <Select
            label="Billing Interval"
            data={['MONTHLY', 'YEARLY']}
            placeholder="Select interval"
            defaultValue="MONTHLY"
            onChange={(value) => setValue('interval', value as Interval)}
            error={errors.interval?.message}
          />

          <Input.Wrapper label="Amount" error={errors.amount?.message}>
            <Input type="number" placeholder="1000" {...register('amount')} />
          </Input.Wrapper>

          <Input.Wrapper label="Trial Days" error={errors.trialDays?.message}>
            <Input
              type="number"
              min={0}
              placeholder="7"
              {...register('trialDays', { valueAsNumber: true })}
            />
          </Input.Wrapper>

          <Button
            type="submit"
            color="blue"
            fullWidth
            mt="md"
            disabled={isPending}
          >
            {isPending ? <Loader size="sm" color="white" /> : 'Create Plan'}
          </Button>
        </form>
      </Modal>

      {/* Open Modal Button */}
      <Button onClick={open}>Add Plan</Button>
    </div>
  );
};

export const PlansForm = forwardRef(PlansComponent);
