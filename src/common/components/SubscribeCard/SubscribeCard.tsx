import { Badge, Button, Card, Group, Text } from '@mantine/core';
import { BasePlanResponse } from '../../../types/type.type';
import { useNavigate } from 'react-router-dom';

const SubscribeCard = (plan: BasePlanResponse) => {
  const navigate = useNavigate();

  const handleOnPlan = (priceId: string) => {
    navigate(`/checkout?plan=${priceId}`);
  };
  return (
    <div>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section></Card.Section>

        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>{plan.name}</Text>
          <Badge color="pink">{plan.interval}</Badge>
        </Group>

        <Text size="sm" c="dimmed">
          {`Price: ${plan.amount}`}
        </Text>

        <Button
          onClick={() => handleOnPlan(plan.priceId)}
          color="blue"
          fullWidth
          mt="md"
          radius="md"
        >
          Subscribe Now
        </Button>
      </Card>
    </div>
  );
};

export default SubscribeCard;
