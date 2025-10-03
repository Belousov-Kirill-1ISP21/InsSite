import React, { useState } from 'react';
import styles from '../css/AdminPanelStyle.module.css';
import { usePolicyMutations } from '../hooks';

export const AdminPanel = () => {
  const [editingPolicy, setEditingPolicy] = useState(null);
  const [formData, setFormData] = useState({
    clientName: '',
    insuranceType: 'Автострахование',
    coverage: 'Полное',
    premium: 5000,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 365 * 86400000).toISOString().split('T')[0]
  });

  const { 
    data: policies = [], 
    isLoading: policiesLoading, 
    error: policiesError,
    createMutation,
    updateMutation,
    deleteMutation
  } = usePolicyMutations();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingPolicy) {
      updateMutation.mutate({
        policyId: editingPolicy.id,
        policyData: formData
      });
    } else {
      createMutation.mutate(formData);
    }
    
    handleReset();
  };

  const handleEdit = (policy) => {
    setEditingPolicy(policy);
    setFormData({
      clientName: policy.clientName,
      insuranceType: policy.insuranceType,
      coverage: policy.coverage,
      premium: policy.premium,
      startDate: policy.startDate,
      endDate: policy.endDate
    });
  };

  const handleDelete = (policyId) => {
    if (window.confirm('Вы уверены, что хотите удалить этот полис?')) {
      deleteMutation.mutate(policyId);
    }
  };

  const handleReset = () => {
    setEditingPolicy(null);
    setFormData({
      clientName: '',
      insuranceType: 'Автострахование',
      coverage: 'Полное',
      premium: 5000,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 365 * 86400000).toISOString().split('T')[0]
    });
  };

  const isLoading = policiesLoading;
  const isMutating = createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

  if (isLoading) {
    return (
      <div className={styles.AdminPanel}>
        <div className={styles.loading}>Загрузка данных...</div>
      </div>
    );
  }

  return (
    <div className={styles.AdminPanel}>
      <div className={styles.header}>
        <h1>Панель администратора</h1>
        <button 
          onClick={handleReset}
          disabled={isMutating}
        >
          {editingPolicy ? 'Отменить редактирование' : 'Очистить форму'}
        </button>
      </div>

      {(policiesError || createMutation.error || updateMutation.error || deleteMutation.error) && (
        <div className={styles.error}>
          {policiesError?.message || 
           createMutation.error?.message || 
           updateMutation.error?.message || 
           deleteMutation.error?.message}
        </div>
      )}

      <div className={styles.sections}>
        <section className={styles.section}>
          <h2>{editingPolicy ? 'Редактировать полис' : 'Создать новый полис'}</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              name="clientName"
              placeholder="Имя клиента"
              value={formData.clientName}
              onChange={handleInputChange}
              required
              disabled={isMutating}
            />
            <select
              name="insuranceType"
              value={formData.insuranceType}
              onChange={handleInputChange}
              disabled={isMutating}
            >
              <option value="Автострахование">Автострахование</option>
              <option value="Медицинское страхование">Медицинское страхование</option>
              <option value="Имущественное страхование">Имущественное страхование</option>
              <option value="Страхование жизни">Страхование жизни</option>
            </select>
            <select
              name="coverage"
              value={formData.coverage}
              onChange={handleInputChange}
              disabled={isMutating}
            >
              <option value="Полное">Полное</option>
              <option value="Стандартное">Стандартное</option>
              <option value="Базовое">Базовое</option>
            </select>
            <input
              type="number"
              name="premium"
              placeholder="Стоимость"
              value={formData.premium}
              onChange={handleInputChange}
              required
              disabled={isMutating}
            />
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              required
              disabled={isMutating}
            />
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              required
              disabled={isMutating}
            />
            <button type="submit" disabled={isMutating}>
              {editingPolicy ? 'Обновить полис' : 'Создать полис'}
            </button>
          </form>
        </section>

        <section className={styles.section}>
          <h2>Страховые полисы ({policies.length})</h2>
          <div className={styles.policies}>
            {policies.map(policy => (
              <div key={policy.id} className={`${styles.policy} ${styles[policy.status?.toLowerCase()] || ''}`}>
                <div className={styles.policyHeader}>
                  <h3>{policy.policyNumber}</h3>
                  <span className={`${styles.status} ${styles[policy.status?.toLowerCase()] || ''}`}>
                    {policy.status}
                  </span>
                </div>
                <div className={styles.policyInfo}>
                  <p><strong>Клиент:</strong> {policy.clientName}</p>
                  <p><strong>Тип страхования:</strong> {policy.insuranceType}</p>
                  <p><strong>Покрытие:</strong> {policy.coverage}</p>
                  <p><strong>Стоимость:</strong> {policy.premium} руб.</p>
                  <p><strong>Период:</strong> {policy.startDate} - {policy.endDate}</p>
                </div>
                <div className={styles.policyActions}>
                  <button 
                    onClick={() => handleEdit(policy)}
                    disabled={isMutating}
                  >
                    Редактировать
                  </button>
                  <button 
                    className={styles.delete}
                    onClick={() => handleDelete(policy.id)}
                    disabled={isMutating}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};