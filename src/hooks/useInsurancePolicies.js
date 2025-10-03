import { useQuery, useQueries } from '@tanstack/react-query';
import { getInsurancePolicies, getClients } from '../api';

export const useInsurancePolicies = () => {
  return useQuery({
    queryKey: ['insurancePolicies'],
    queryFn: getInsurancePolicies,
    staleTime: 5 * 60 * 1000,
  });
};

export const usePolicyDetails = (policyId) => {
  return useQuery({
    queryKey: ['policy', policyId],
    queryFn: async () => {
      const policies = await getInsurancePolicies();
      return policies.find(policy => policy.id === policyId);
    },
    enabled: !!policyId,
  });
};

export const usePoliciesAndClients = () => {
  return useQueries({
    queries: [
      {
        queryKey: ['insurancePolicies'],
        queryFn: getInsurancePolicies,
      },
      {
        queryKey: ['clients'],
        queryFn: getClients,
      }
    ]
  });
};