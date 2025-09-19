import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

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
  status: post.id % 3 === 0 ? 'Завершен' : 'Активен',
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
      axios.get(`${API_BASE_URL}/posts`),
      axios.get(`${API_BASE_URL}/users`)
    ]);

    const users = usersResponse.data.reduce((acc, user) => {
      acc[user.id] = user;
      return acc;
    }, {});

    const policies = postsResponse.data.slice(0, 10).map(post => 
      transformPostToPolicy(post, users[post.userId] || { name: 'Неизвестный клиент', id: post.userId })
    );

    return policies;
  } catch (error) {
    throw new Error(`Ошибка при получении страховых полисов: ${error.message}`);
  }
};

export const getClients = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data.map(transformUserToClient);
  } catch (error) {
    throw new Error(`Ошибка при получении клиентов: ${error.message}`);
  }
};

export const createInsurancePolicy = async (policyData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/posts`, {
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

    return newPolicy;
  } catch (error) {
    throw new Error(`Ошибка при создании полиса: ${error.message}`);
  }
};

export const updateInsurancePolicy = async (policyId, policyData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/posts/${policyId}`, {
      id: policyId,
      title: `Updated Insurance Policy for ${policyData.clientName}`,
      body: JSON.stringify(policyData),
      userId: 1
    });

    const updatedPolicy = {
      id: policyId,
      policyNumber: `POL-${String(policyId).padStart(3, '0')}`,
      ...policyData,
      userId: 1
    };

    return updatedPolicy;
  } catch (error) {
    throw new Error(`Ошибка при обновлении полиса: ${error.message}`);
  }
};

export const deleteInsurancePolicy = async (policyId) => {
  try {
    await axios.delete(`${API_BASE_URL}/posts/${policyId}`);
    return policyId;
  } catch (error) {
    throw new Error(`Ошибка при удалении полиса: ${error.message}`);
  }
};