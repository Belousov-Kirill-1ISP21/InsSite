import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

let localPolicies = [];

export const api = {
  posts: {
    get: () => axios.get(`${API_BASE_URL}/posts`),
    create: (data) => axios.post(`${API_BASE_URL}/posts`, data),
    update: (id, data) => {
      if (id > 100) {
        const existingPolicy = localPolicies.find(p => p.id === id);
        if (existingPolicy) {
          Object.assign(existingPolicy, data);
        }
        return Promise.resolve({ data: { id, ...data } });
      }
      return axios.put(`${API_BASE_URL}/posts/${id}`, data);
    },
    delete: (id) => {
      if (id > 100) {
        localPolicies = localPolicies.filter(p => p.id !== id);
        return Promise.resolve({ data: {} });
      }
      return axios.delete(`${API_BASE_URL}/posts/${id}`);
    },
  },
  users: {
    get: () => axios.get(`${API_BASE_URL}/users`),
  }
};

const transformUserToClient = (user) => ({
  id: user.id,
  name: user.name,
  phone: user.phone || `+7 (999) ${100 + user.id}-${1000 + user.id}`,
  email: user.email,
  username: user.username
});

const transformPostToPolicy = (post, user) => ({
  id: post.id,
  policyNumber: `POL-${String(post.id).padStart(3, '0')}`,
  clientName: user.name,
  insuranceType: getInsuranceType(post.id),
  coverage: getCoverageType(post.id),
  premium: calculatePrice(post.id),
  startDate: new Date(Date.now() - (post.id * 86400000)).toISOString().split('T')[0],
  endDate: new Date(Date.now() + (365 * 86400000) - (post.id * 86400000)).toISOString().split('T')[0],
  status: (post.id % 3 === 0 ? 'Завершен' : 'Активен'),
  userId: post.userId
});

const getInsuranceType = (id) => {
  const types = ['Автострахование', 'Медицинское страхование', 'Имущественное страхование', 'Страхование жизни'];
  return types[id % types.length];
};

const getCoverageType = (id) => {
  const coverages = ['Полное', 'Стандартное', 'Базовое'];
  return coverages[id % coverages.length];
};

const calculatePrice = (id) => Math.floor(5000 + (id * 1000));

export const getInsurancePolicies = async () => {
  try {
    const [postsResponse, usersResponse] = await Promise.all([
      api.posts.get(),
      api.users.get()
    ]);

    const users = usersResponse.data.reduce((acc, user) => {
      acc[user.id] = user;
      return acc;
    }, {});

    const apiPolicies = postsResponse.data.slice(0, 10).map(post => 
      transformPostToPolicy(post, users[post.userId] || { 
        name: `Клиент ${post.userId}`, 
        id: post.userId 
      })
    );

    const allPolicies = [...apiPolicies, ...localPolicies].slice(0, 10);
    
    return allPolicies;
  } catch (error) {
    throw new Error(`Ошибка при получении страховых полисов: ${error.message}`);
  }
};

export const getClients = async () => {
  try {
    const response = await api.users.get();
    return response.data.map(transformUserToClient);
  } catch (error) {
    throw new Error(`Ошибка при получении клиентов: ${error.message}`);
  }
};

export const createInsurancePolicy = async (policyData) => {
  try {
    const response = await api.posts.create({
      title: `Insurance Policy for ${policyData.clientName}`,
      body: JSON.stringify(policyData),
      userId: 1
    });

    const newPolicy = {
      id: response.data.id,
      policyNumber: `POL-${String(response.data.id).padStart(3, '0')}`,
      ...policyData,
      status: 'Активен',
      userId: 1
    };

    if (response.data.id > 100) {
      localPolicies.push(newPolicy);
    }

    return newPolicy;
  } catch (error) {
    throw new Error(`Ошибка при создании полиса: ${error.message}`);
  }
};

export const updateInsurancePolicy = async (policyId, policyData) => {
  try {
    const response = await api.posts.update(policyId, {
      id: policyId,
      title: `Updated Insurance Policy for ${policyData.clientName}`,
      body: JSON.stringify(policyData),
      userId: 1
    });

    const updatedPolicy = {
      id: policyId,
      policyNumber: `POL-${String(policyId).padStart(3, '0')}`,
      ...policyData,
      status: policyData.status || 'Активен',
      userId: 1
    };

    return updatedPolicy;
  } catch (error) {
    throw new Error(`Ошибка при обновлении полиса: ${error.message}`);
  }
};

export const deleteInsurancePolicy = async (policyId) => {
  try {
    await api.posts.delete(policyId);
    return policyId;
  } catch (error) {
    throw new Error(`Ошибка при удалении полиса: ${error.message}`);
  }
};