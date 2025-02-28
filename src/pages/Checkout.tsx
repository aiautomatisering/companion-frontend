import { useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import subscriptionService from '../services/subscriptions';
import { AuthContext } from '../context/AuthContext';

export const Checkout = () => {
  const [searchParams] = useSearchParams();
  const planId = searchParams.get('plan');
  const { auth } = useContext(AuthContext);

  const mutation = useMutation({
    mutationFn: ({ planId, email }: { planId: string; email: string }) =>
      subscriptionService.createCheckoutSession(planId, email),
    onSuccess: (data) => {
      console.log('data', data);
      window.location.href = data.url;
    },
    onError: (error) => {
      console.error('Checkout failed:', error);
    },
  });

  useEffect(() => {
    if (
      planId &&
      auth?.user.email &&
      !mutation.isPending &&
      !mutation.isSuccess
    ) {
      mutation.mutate({ planId, email: auth.user.email });
    }
  }, [planId, auth?.user.email]); // ✅ Removed `mutation` from dependencies

  return (
    <div>
      {mutation.isPending ? (
        <p>Redirecting to checkout...</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
