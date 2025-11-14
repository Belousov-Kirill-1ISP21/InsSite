import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

const retryRequest = async (fn, retries = 2, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      console.log(`Повторная попытка... Осталось попыток: ${retries}`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return retryRequest(fn, retries - 1, delay * 2);
    }
    throw error;
  }
};

export const api = {
  posts: {
    get: () => retryRequest(() => apiClient.get('/posts')),
    create: (data) => retryRequest(() => apiClient.post('/posts', data)),
    update: (id, data) => retryRequest(() => apiClient.put(`/posts/${id}`, data)),
    delete: (id) => retryRequest(() => apiClient.delete(`/posts/${id}`)),
  },
  users: {
    get: () => retryRequest(() => apiClient.get('/users')),
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

const isDemoMode = false;

export const getInsurancePolicies = async () => {
  if (isDemoMode) {
    return generateDemoPolicies();
  }

  try {
    
    const [postsResponse, usersResponse] = await Promise.all([
      api.posts.get(),
      api.users.get()
    ]);

    const users = usersResponse.data.reduce((acc, user) => {
      acc[user.id] = user;
      return acc;
    }, {});

    const apiPolicies = postsResponse.data.map(post => 
      transformPostToPolicy(post, users[post.userId] || { 
        name: `Клиент ${post.userId}`, 
        id: post.userId 
      })
    );
    
    return apiPolicies;
  } catch (error) {
    console.warn('API недоступен, используем демо-данные:', error.message);
    return generateDemoPolicies();
  }
};

const generateDemoPolicies = () => {
  const demoPolicies = [];
  for (let i = 1; i <= 20; i++) {
    demoPolicies.push({
      id: i,
      policyNumber: `POL-${String(i).padStart(3, '0')}`,
      clientName: `Клиент ${i}`,
      insuranceType: getInsuranceType(i),
      coverage: getCoverageType(i),
      premium: calculatePrice(i),
      startDate: new Date(Date.now() - (i * 86400000)).toISOString().split('T')[0],
      endDate: new Date(Date.now() + (365 * 86400000) - (i * 86400000)).toISOString().split('T')[0],
      status: (i % 3 === 0 ? 'Завершен' : 'Активен'),
      userId: 1,
      isDemo: true
    });
  }
  return demoPolicies;
};

export const getClients = async () => {
  if (isDemoMode) {
    return generateDemoClients();
  }

  try {
    const response = await api.users.get();
    return response.data.map(transformUserToClient);
  } catch (error) {
    console.warn('API клиентов недоступен, используем демо-данные:', error.message);
    return generateDemoClients();
  }
};

const generateDemoClients = () => {
  return [
    { id: 1, name: 'Иван Иванов', phone: '+7 (999) 123-45-67', email: 'ivan@mail.com', username: 'ivanov' },
    { id: 2, name: 'Петр Петров', phone: '+7 (999) 234-56-78', email: 'petr@mail.com', username: 'petrov' },
    { id: 3, name: 'Мария Сидорова', phone: '+7 (999) 345-67-89', email: 'maria@mail.com', username: 'sidorova' }
  ];
};

export const createInsurancePolicy = async (policyData) => {
  if (isDemoMode) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      id: Date.now(),
      policyNumber: `POL-${String(Date.now()).slice(-3)}`,
      ...policyData,
      status: 'Активен',
      isDemo: true
    };
  }

  try {
    const response = await api.posts.create({
      title: `Insurance Policy for ${policyData.clientName}`,
      body: JSON.stringify(policyData),
      userId: 1
    });

    return {
      id: response.data.id,
      policyNumber: `POL-${String(response.data.id).padStart(3, '0')}`,
      ...policyData,
      status: 'Активен',
      userId: 1
    };
  } catch (error) {
    console.warn('API создания недоступен', error.message);
    return {
      id: Date.now(),
      policyNumber: `POL-${String(Date.now()).slice(-3)}`,
      ...policyData,
      status: 'Активен',
      isDemo: true
    };
  }
};

export const updateInsurancePolicy = async (policyId, policyData) => {
  if (isDemoMode) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { id: policyId, ...policyData, isDemo: true };
  }

  try {
    const response = await api.posts.update(policyId, {
      id: policyId,
      title: `Updated Insurance Policy for ${policyData.clientName}`,
      body: JSON.stringify(policyData),
      userId: 1
    });

    return {
      id: policyId,
      policyNumber: `POL-${String(policyId).padStart(3, '0')}`,
      ...policyData,
      status: policyData.status || 'Активен',
      userId: 1
    };
  } catch (error) {
    console.warn('API обновления недоступен', error.message);
    return { id: policyId, ...policyData, isDemo: true };
  }
};

export const deleteInsurancePolicy = async (policyId) => {
  if (isDemoMode) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return policyId;
  }

  try {
    await api.posts.delete(policyId);
    return policyId;
  } catch (error) {
    console.warn('API удаления недоступен', error.message);
    return policyId;
  }
};