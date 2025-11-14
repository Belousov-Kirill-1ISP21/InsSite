import React, { useEffect, useState, useMemo } from 'react';
import styles from '../css/AdminPanelStyle.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { 
  setEditingPolicy, 
  clearEditingPolicy,
  fetchPolicies
} from '../store/slices/policiesSlice';
import { 
  useCreatePolicy, 
  useUpdatePolicy, 
  useDeletePolicy
} from '../store/hooks';

export function AdminPanel() {
  const dispatch = useDispatch();
  const { items: policies, loading, error, editingPolicy } = useSelector(state => state.policies);
  const { create: createPolicy } = useCreatePolicy();
  const { update: updatePolicy } = useUpdatePolicy();
  const { remove: deletePolicy } = useDeletePolicy();
  
  const [newPolicy, setNewPolicy] = useState({
    clientName: '',
    insuranceType: 'Автострахование',
    coverage: 'Полное',
    premium: 5000,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 365 * 86400000).toISOString().split('T')[0]
  });

  const [currentPage, setCurrentPage] = useState(1);
  const policiesPerPage = 10;
  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    dispatch(fetchPolicies());
  }, [dispatch]);

  const sortedPolicies = useMemo(() => {
    return [...policies].sort((a, b) => a.id - b.id);
  }, [policies]);

  const totalPages = Math.ceil(sortedPolicies.length / policiesPerPage);
  const indexOfLastPolicy = currentPage * policiesPerPage;
  const indexOfFirstPolicy = indexOfLastPolicy - policiesPerPage;
  
  const currentPolicies = sortedPolicies.slice(indexOfFirstPolicy, indexOfLastPolicy);

  useEffect(() => {
    if (sortedPolicies.length > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [sortedPolicies.length, totalPages, currentPage]);

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  };

  const handleCreatePolicy = async (e) => {
    e.preventDefault();
    if (!newPolicy.clientName.trim()) return;
    
    try {
      await createPolicy(newPolicy);
      setNewPolicy({
        clientName: '',
        insuranceType: 'Автострахование',
        coverage: 'Полное',
        premium: 5000,
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 365 * 86400000).toISOString().split('T')[0]
      });
      
      setTimeout(() => {
        if (totalPages > 0) {
          setCurrentPage(totalPages);
        }
      }, 500);
      
    } catch (error) {
      console.error('Failed to create policy:', error);
      showNotification('Ошибка при создании полиса', 'error');
    }
  };

  const handleClearForm = () => {
    setNewPolicy({
      clientName: '',
      insuranceType: 'Автострахование',
      coverage: 'Полное',
      premium: 5000,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 365 * 86400000).toISOString().split('T')[0]
    });
  };

  const handleUpdatePolicy = async (e) => {
    e.preventDefault();
    if (!editingPolicy) return;
    
    try {
      await updatePolicy(editingPolicy.id, editingPolicy);
      dispatch(clearEditingPolicy());
    } catch (error) {
      console.error('Failed to update policy:', error);
    }
  };

  const handleDeletePolicy = async (policyId) => {
    if (window.confirm('Вы уверены, что хотите удалить этот полис?')) {
      try {
        await deletePolicy(policyId);
        if (currentPolicies.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      } catch (error) {
        console.error('Failed to delete policy:', error);
      }
    }
  };

  const startEditing = (policy) => {
    dispatch(setEditingPolicy({...policy}));
  };

  const cancelEditing = () => {
    dispatch(clearEditingPolicy());
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className={styles.pagination}>
        <button 
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles.paginationButton}
        >
          Назад
        </button>
        
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={`${styles.paginationButton} ${currentPage === number ? styles.active : ''}`}
          >
            {number}
          </button>
        ))}
        
        <button 
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={styles.paginationButton}
        >
          Вперед
        </button>
      </div>
    );
  };

  if (loading && policies.length === 0) {
    return <div className={styles.loading}>Загрузка полисов...</div>;
  }

  return (
    <div className={styles.AdminPanel}>
      <div className={styles.header}>
        <h1>Панель администратора</h1>
        <button onClick={handleClearForm}>
          Очистить форму
        </button>
      </div>

      {error && (
        <div className={styles.error}>
          Ошибка: {error}
        </div>
      )}

      <div className={styles.sections}>
        <div className={styles.section}>
          <h2>Создать новый полис</h2>
          <form className={styles.form} onSubmit={handleCreatePolicy}>
            <input
              type="text"
              placeholder="Имя клиента"
              value={newPolicy.clientName}
              onChange={(e) => setNewPolicy({ ...newPolicy, clientName: e.target.value })}
              required
              disabled={loading}
            />
            <select
              value={newPolicy.insuranceType}
              onChange={(e) => setNewPolicy({ ...newPolicy, insuranceType: e.target.value })}
              disabled={loading}
            >
              <option value="Автострахование">Автострахование</option>
              <option value="Медицинское страхование">Медицинское страхование</option>
              <option value="Имущественное страхование">Имущественное страхование</option>
              <option value="Страхование жизни">Страхование жизни</option>
            </select>
            <select
              value={newPolicy.coverage}
              onChange={(e) => setNewPolicy({ ...newPolicy, coverage: e.target.value })}
              disabled={loading}
            >
              <option value="Полное">Полное</option>
              <option value="Стандартное">Стандартное</option>
              <option value="Базовое">Базовое</option>
            </select>
            <input
              type="number"
              placeholder="Стоимость"
              value={newPolicy.premium}
              onChange={(e) => setNewPolicy({ ...newPolicy, premium: parseInt(e.target.value) || 0 })}
              required
              disabled={loading}
            />
            <input
              type="date"
              value={newPolicy.startDate}
              onChange={(e) => setNewPolicy({ ...newPolicy, startDate: e.target.value })}
              required
              disabled={loading}
            />
            <input
              type="date"
              value={newPolicy.endDate}
              onChange={(e) => setNewPolicy({ ...newPolicy, endDate: e.target.value })}
              required
              disabled={loading}
            />
            <button type="submit" disabled={loading || !newPolicy.clientName.trim()}>
              {loading ? 'Создание...' : 'Создать полис'}
            </button>
          </form>
        </div>

        <div className={styles.section}>
          <div className={styles.policiesHeader}>
            <h2>Страховые полисы ({sortedPolicies.length})</h2>
            <div className={styles.paginationInfo}>
              Страница {currentPage} из {totalPages} 
            </div>
          </div>
          
          <div className={styles.policies}>
            {currentPolicies.length === 0 ? (
              <div className={styles.noPolicies}>Полисы не найдены</div>
            ) : (
              currentPolicies.map((policy) => (
                <div key={policy.id} className={`${styles.policy} ${styles[policy.status?.toLowerCase()] || ''}`}>
                  {editingPolicy?.id === policy.id ? (
                    <form className={styles.editForm} onSubmit={handleUpdatePolicy}>
                      <input
                        type="text"
                        value={editingPolicy.clientName || ''}
                        onChange={(e) => dispatch(setEditingPolicy({ 
                          ...editingPolicy, 
                          clientName: e.target.value 
                        }))}
                        disabled={loading}
                      />
                      <select
                        value={editingPolicy.insuranceType || ''}
                        onChange={(e) => dispatch(setEditingPolicy({ 
                          ...editingPolicy, 
                          insuranceType: e.target.value 
                        }))}
                        disabled={loading}
                      >
                        <option value="Автострахование">Автострахование</option>
                        <option value="Медицинское страхование">Медицинское страхование</option>
                        <option value="Имущественное страхование">Имущественное страхование</option>
                        <option value="Страхование жизни">Страхование жизни</option>
                      </select>
                      <div className={styles.editActions}>
                        <button type="submit" disabled={loading}>
                          {loading ? 'Сохранение...' : 'Сохранить'}
                        </button>
                        <button type="button" onClick={cancelEditing} disabled={loading}>
                          Отмена
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
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
                          onClick={() => startEditing(policy)}
                          disabled={loading}
                        >
                          Редактировать
                        </button>
                        <button 
                          className={styles.delete}
                          onClick={() => handleDeletePolicy(policy.id)}
                          disabled={loading}
                        >
                          Удалить
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>

          {renderPagination()}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;