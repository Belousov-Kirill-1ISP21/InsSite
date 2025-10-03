import { useQueryClient } from '@tanstack/react-query';

export const usePrefetchPolicies = () => {
  const queryClient = useQueryClient();
  
  return () => {
    queryClient.prefetchQuery({
      queryKey: ['insurancePolicies'],
      queryFn: () => import('../api').then(module => module.getInsurancePolicies()),
    });
  };
};

export const prefetchCatalogData = async () => {
  const { getInsurancePolicies, getClients } = await import('../api');
  
  const queryClient = (await import('@tanstack/react-query')).useQueryClient();
  
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['insurancePolicies'],
      queryFn: getInsurancePolicies,
    }),
    queryClient.prefetchQuery({
      queryKey: ['clients'],
      queryFn: getClients,
    }),
  ]);
};