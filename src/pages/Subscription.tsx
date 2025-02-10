import {
  Card,
  Text,
  Group,
  Button,
  Badge,
  SimpleGrid,
  Stack,
} from '@mantine/core';

const plans = [
  {
    title: 'Basic',
    description: 'For personal use',
    price: 'Free',
    buttonText: 'View current plan',
    features: [
      'Features & Benefits',
      'Features & Benefits',
      'Features & Benefits',
    ],
    border: '1px solid #D6BCFA', // Light purple border
  },
  {
    title: 'Business',
    description: 'For small business',
    price: '$39.99',
    priceSubtext: '/team/month',
    buttonText: 'Upgrade',
    features: [
      'Up to 10 members',
      'Collaboration features',
      'Smart analytics',
      '30-day free trial',
    ],
    popular: true,
    border: '1px solid #CBD5E0', // Light gray border
  },
  {
    title: 'Enterprise',
    description: 'For large enterprise',
    price: '$59.99',
    priceSubtext: '/team/month',
    buttonText: 'Upgrade',
    features: ['Up to 10 members', 'Collaboration features', 'Smart analytics'],
    border: 'none', // No border for Enterprise
  },
];

export const Subscription = () => {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
      {plans.map((plan, index) => (
        <Card
          key={index}
          shadow="sm"
          padding="lg"
          radius="md"
          style={{
            border: plan.border,
            minWidth: '250px',
            maxWidth: '350px',
          }}
        >
          {plan.popular && (
            <Badge size="sm" variant="light" style={{ alignSelf: 'flex-end' }}>
              Popular
            </Badge>
          )}

          <Stack>
            <Text fw={700} size="lg">
              {plan.title}
            </Text>
            <Text size="sm" c="dimmed">
              {plan.description}
            </Text>
            <Text size="xl" fw={700}>
              {plan.price}{' '}
              {plan.priceSubtext && (
                <Text size="sm" span c="dimmed">
                  {plan.priceSubtext}
                </Text>
              )}
            </Text>

            <Button
              fullWidth
              variant={plan.title === 'Business' ? 'filled' : 'outline'}
              color={plan.title === 'Business' ? 'dark' : 'gray'}
              mt="md"
            >
              {plan.buttonText}
            </Button>

            <Stack mt="md">
              {plan.features.map((feature, idx) => (
                <Group key={idx}>
                  ✅ <Text size="sm">{feature}</Text>
                </Group>
              ))}
            </Stack>
          </Stack>
        </Card>
      ))}
    </SimpleGrid>
  );
};
