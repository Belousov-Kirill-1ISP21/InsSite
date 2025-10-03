import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getInsurancePolicies, createInsurancePolicy, updateInsurancePolicy, deleteInsurancePolicy } from '../api';

let localPolicies = [];

export const usePolicyMutations = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['insurancePolicies'],
    queryFn: async () => {
      const policies = await getInsurancePolicies();
      localPolicies = policies; 
      return policies;
    },
    staleTime: Infinity, 
    cacheTime: Infinity, 
  });

  const createMutation = useMutation({
    mutationFn: createInsurancePolicy,
    onSuccess: (newPolicy) => {
      localPolicies = [...localPolicies, newPolicy];
      queryClient.setQueryData(['insurancePolicies'], localPolicies);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ policyId, policyData }) => {
      if (policyId > 100) {
        const updatedPolicy = {
          id: policyId,
          policyNumber: `POL-${String(policyId).padStart(3, '0')}`,
          ...policyData,
          status: policyData.status || 'Активен',
          userId: 1
        };
        return Promise.resolve(updatedPolicy);
      }
      return updateInsurancePolicy(policyId, policyData);
    },
    onSuccess: (updatedPolicy) => {
      localPolicies = localPolicies.map(policy =>
        policy.id === updatedPolicy.id ? updatedPolicy : policy
      );
      queryClient.setQueryData(['insurancePolicies'], localPolicies);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (policyId) => {
      if (policyId > 100) {
        return Promise.resolve(policyId);
      }
      return deleteInsurancePolicy(policyId);
    },
    onSuccess: (policyId) => {
      localPolicies = localPolicies.filter(policy => policy.id !== policyId);
      queryClient.setQueryData(['insurancePolicies'], localPolicies);
    },
  });

  return {
    data: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
    createMutation,
    updateMutation,
    deleteMutation,
  };
};