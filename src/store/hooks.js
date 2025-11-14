import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { 
  createPolicy, 
  updatePolicy, 
  deletePolicy,
  fetchPolicies,
  addPolicyLocal,
  updatePolicyLocal,
  removePolicyLocal
} from './slices/policiesSlice';

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

export const useAuth = () => useAppSelector((state) => state.auth);
export const useIsAuthenticated = () => useAppSelector((state) => state.auth.isAuthenticated);
export const usePolicies = () => useAppSelector((state) => state.policies);
export const usePolicy = (policyId) => useAppSelector((state) => 
  state.policies.items.find(policy => policy.id === policyId)
);

export const useCreatePolicy = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = usePolicies();
  
  const create = async (policyData) => {
    try {
      const tempId = Date.now();
      const localPolicy = {
        id: tempId,
        policyNumber: `POL-${String(tempId).slice(-3)}`,
        ...policyData,
        status: 'Активен',
        isLocal: true,
        createdAt: new Date().toISOString() 
      };
      dispatch(addPolicyLocal(localPolicy));
      
      const result = await dispatch(createPolicy(policyData)).unwrap();
      
      dispatch(removePolicyLocal(tempId));
      dispatch(addPolicyLocal({
        ...result,
        createdAt: new Date().toISOString()
      }));
      
      return result;
    } catch (error) {
      dispatch(removePolicyLocal(Date.now()));
      throw error;
    }
  };
  
  return { create, loading, error };
};

export const useUpdatePolicy = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = usePolicies();
  
  const update = async (policyId, policyData) => {
    try {
      dispatch(updatePolicyLocal({ id: policyId, ...policyData }));
      
      const result = await dispatch(updatePolicy({ policyId, policyData })).unwrap();
      
      return result;
    } catch (error) {
      dispatch(fetchPolicies());
      throw error;
    }
  };
  
  return { update, loading, error };
};

export const useDeletePolicy = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = usePolicies();
  
  const remove = async (policyId) => {
    try {
      dispatch(removePolicyLocal(policyId));
      
      const deletePromise = dispatch(deletePolicy(policyId)).unwrap();

      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Таймаут операции удаления')), 3000)
      );
      
      await Promise.race([deletePromise, timeoutPromise]);
      
      return policyId;
    } catch (error) {
      console.warn('Ошибка при удалении:', error.message);
      return policyId;
    }
  };
  
  return { remove, loading, error };
};

export const selectActivePolicies = createSelector(
  [usePolicies],
  (policies) => policies.items.filter(policy => policy.status === 'Активен')
);

export const selectCompletedPolicies = createSelector(
  [usePolicies],
  (policies) => policies.items.filter(policy => policy.status === 'Завершен')
);

export const useClients = () => useAppSelector((state) => state.clients);
export const useClient = (clientId) => useAppSelector((state) => 
  state.clients.items.find(client => client.id === clientId)
);

export const useProfile = (userId = 1) => {
  const clients = useClients();
  const user = clients.items?.find(client => client.id === userId) || clients.items?.[0];
  
  return {
    data: user,
    isLoading: clients.loading,
    error: clients.error
  };
};