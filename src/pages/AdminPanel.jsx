import React, { useState, useEffect } from 'react';
import styles from '../css/AdminPanelStyle.module.css';
import { 
  getInsurancePolicies, 
  getClients, 
  createInsurancePolicy, 
  updateInsurancePolicy, 
  deleteInsurancePolicy 
} from '../api';

const AdminPanel = () => {
  const [policies, setPolicies] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [newPolicy, setNewPolicy] = useState({
    clientName: '',
    insuranceType: 'Автострахование',
    coverage: 'Полное',
    premium: '',
    startDate: '',
    endDate: ''
  });
  const [editingPolicy, setEditingPolicy] = useState(null);

  const insuranceTypes = ['Автострахование', 'Медицинское страхование', 'Имущественное страхование', 'Страхование жизни'];
  const coverageTypes = ['Полное', 'Стандартное', 'Базовое'];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const [policiesData, clientsData] = await Promise.all([
        getInsurancePolicies(),
        getClients()
      ]);
      setPolicies(policiesData);
      setClients(clientsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePolicy = async (e) => {
    e.preventDefault();
    if (!newPolicy.clientName || !newPolicy.premium || !newPolicy.startDate || !newPolicy.endDate) {
      setError('Заполните все обязательные поля');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const createdPolicy = await createInsurancePolicy({
        ...newPolicy,
        premium: parseInt(newPolicy.premium)
      });
      setPolicies(prev => [createdPolicy, ...prev]);
      setNewPolicy({
        clientName: '',
        insuranceType: 'Автострахование',
        coverage: 'Полное',
        premium: '',
        startDate: '',
        endDate: ''
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePolicy = async (policyId, updatedData) => {
    setLoading(true);
    setError('');
    try {
      const updatedPolicy = await updateInsurancePolicy(policyId, updatedData);
      setPolicies(prev => prev.map(policy => 
        policy.id === policyId ? { ...policy, ...updatedPolicy } : policy
      ));
      setEditingPolicy(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePolicy = async (policyId) => {
    setLoading(true);
    setError('');
    try {
      await deleteInsurancePolicy(policyId);
      setPolicies(prev => prev.filter(policy => policy.id !== policyId));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  return (
    <div className={styles.AdminPanel}>
      <div className={styles.header}>
        <h1>Управление страховыми полисами</h1>
        <button onClick={loadData} disabled={loading}>
          {loading ? 'Обновление...' : 'Обновить данные'}
        </button>
      </div>

      {error && <div className={styles.error}>{error}</div>}
      {loading && <div className={styles.loading}>Загрузка данных...</div>}

      <div className={styles.sections}>

        <section className={styles.section}>
          <h2>Оформить новый полис</h2>
          <form onSubmit={handleCreatePolicy} className={styles.form}>
            <select
              value={newPolicy.clientName}
              onChange={(e) => setNewPolicy({...newPolicy, clientName: e.target.value})}
              disabled={loading}
              required
            >
              <option value="">Выберите клиента</option>
              {clients.map(client => (
                <option key={client.id} value={client.name}>
                  {client.name} ({client.phone})
                </option>
              ))}
            </select>

            <select
              value={newPolicy.insuranceType}
              onChange={(e) => setNewPolicy({...newPolicy, insuranceType: e.target.value})}
              disabled={loading}
            >
              {insuranceTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <select
              value={newPolicy.coverage}
              onChange={(e) => setNewPolicy({...newPolicy, coverage: e.target.value})}
              disabled={loading}
            >
              {coverageTypes.map(coverage => (
                <option key={coverage} value={coverage}>{coverage}</option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Цена тарифа (руб)"
              value={newPolicy.premium}
              onChange={(e) => setNewPolicy({...newPolicy, premium: e.target.value})}
              disabled={loading}
              required
              min="1000"
            />

            <input
              type="date"
              placeholder="Дата начала"
              value={newPolicy.startDate}
              onChange={(e) => setNewPolicy({...newPolicy, startDate: e.target.value})}
              disabled={loading}
              required
            />

            <input
              type="date"
              placeholder="Дата окончания"
              value={newPolicy.endDate}
              onChange={(e) => setNewPolicy({...newPolicy, endDate: e.target.value})}
              disabled={loading}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? 'Создание...' : 'Оформить полис'}
            </button>
          </form>
        </section>

        <section className={styles.section}>
          <h2>Страховые полисы ({policies.length})</h2>
          <div className={styles.policies}>
            {policies.map(policy => (
              <div key={policy.id} className={`${styles.policy} ${styles[policy.status.toLowerCase()]}`}>
                {editingPolicy?.id === policy.id ? (
                  <div className={styles.editForm}>
                    <select
                      value={editingPolicy.clientName}
                      onChange={(e) => setEditingPolicy({
                        ...editingPolicy,
                        clientName: e.target.value
                      })}
                    >
                      {clients.map(client => (
                        <option key={client.id} value={client.name}>
                          {client.name}
                        </option>
                      ))}
                    </select>

                    <select
                      value={editingPolicy.insuranceType}
                      onChange={(e) => setEditingPolicy({
                        ...editingPolicy,
                        insuranceType: e.target.value
                      })}
                    >
                      {insuranceTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>

                    <select
                      value={editingPolicy.coverage}
                      onChange={(e) => setEditingPolicy({
                        ...editingPolicy,
                        coverage: e.target.value
                      })}
                    >
                      {coverageTypes.map(coverage => (
                        <option key={coverage} value={coverage}>{coverage}</option>
                      ))}
                    </select>

                    <input
                      type="number"
                      value={editingPolicy.premium}
                      onChange={(e) => setEditingPolicy({
                        ...editingPolicy,
                        premium: e.target.value
                      })}
                      min="1000"
                    />

                    <input
                      type="date"
                      value={editingPolicy.startDate}
                      onChange={(e) => setEditingPolicy({
                        ...editingPolicy,
                        startDate: e.target.value
                      })}
                    />

                    <input
                      type="date"
                      value={editingPolicy.endDate}
                      onChange={(e) => setEditingPolicy({
                        ...editingPolicy,
                        endDate: e.target.value
                      })}
                    />

                    <div className={styles.editActions}>
                      <button
                        onClick={() => handleUpdatePolicy(policy.id, {
                          clientName: editingPolicy.clientName,
                          insuranceType: editingPolicy.insuranceType,
                          coverage: editingPolicy.coverage,
                          premium: parseInt(editingPolicy.premium),
                          startDate: editingPolicy.startDate,
                          endDate: editingPolicy.endDate
                        })}
                        disabled={loading}
                      >
                        Сохранить
                      </button>
                      <button
                        onClick={() => setEditingPolicy(null)}
                        disabled={loading}
                      >
                        Отмена
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className={styles.policyHeader}>
                      <h3>{policy.policyNumber}</h3>
                      <span className={`${styles.status} ${styles[policy.status.toLowerCase()]}`}>
                        {policy.status}
                      </span>
                    </div>
                    
                    <div className={styles.policyInfo}>
                      <p><strong>Клиент:</strong> {policy.clientName}</p>
                      <p><strong>Тип страхования:</strong> {policy.insuranceType}</p>
                      <p><strong>Покрытие:</strong> {policy.coverage}</p>
                      <p><strong>Цена тарифа:</strong> {formatCurrency(policy.premium)}</p>
                      <p><strong>Период:</strong> {formatDate(policy.startDate)} - {formatDate(policy.endDate)}</p>
                    </div>

                    <div className={styles.policyActions}>
                      <button
                        onClick={() => setEditingPolicy(policy)}
                        disabled={loading}
                      >
                        Редактировать
                      </button>
                      <button
                        onClick={() => handleDeletePolicy(policy.id)}
                        disabled={loading}
                        className={styles.delete}
                      >
                        Удалить
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminPanel;