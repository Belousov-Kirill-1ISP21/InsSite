import { useQuery } from '@tanstack/react-query';
import { getClients } from '../api';

export const useProfile = (userId = 1) => {
  return useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      const clients = await getClients();
      return clients.find(client => client.id === userId) || clients[0];
    },
    staleTime: 10 * 60 * 1000,
  });
};