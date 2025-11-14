import styles from '../../css/General/HeaderStyle.module.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { fetchPolicies } from '../../store/slices/policiesSlice';

export const Header = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const handleLogout = () => {
        dispatch(logout());
    };

    const handlePrefetchPolicies = () => {
        // Prefetch через Redux
        dispatch(fetchPolicies());
    };

    return (
        <div className={styles.Header} id="Header">
        
        <div className={styles.HeaderLeft}>
            
            <button className={styles.HeaderLogoButton}>
                <Link to="/" className={styles.HeaderLeftLink}>Страхование онлаин</Link>
            </button>
            
            <div className={styles.HeaderLeftButtonContainer}>
            
                <button className={styles.HeaderLeftButton}>
                    <Link 
                        to="/AdminPanel" 
                        className={styles.HeaderLeftButtonContainerLink}
                        onMouseEnter={handlePrefetchPolicies} 
                    >
                        Админ панель
                    </Link>
                </button>

                <button className={styles.HeaderLeftButton}>
                    <Link 
                        to="/Catalog" 
                        className={styles.HeaderLeftButtonContainerLink}
                        onMouseEnter={handlePrefetchPolicies} 
                    >
                        Каталог
                    </Link>
                </button>
           
                <button className={styles.HeaderLeftButton}>Помощь</button>
                <button className={styles.HeaderLeftContactButton}>
                    <p className={styles.HeaderLeftContactButtonText}>Контакты: </p> 
                    <p className={styles.HeaderLeftContactButtonTextInText}>+7 495 123-45-67</p> 
                </button>
            </div>
        </div>

        <div className={styles.HeaderRight}>
                {isAuthenticated ? (
                    <>
                        <Link to="/Profile" className={styles.HeaderRightLink}>
                            <button className={styles.HeaderRightButton}>Личный кабинет</button>
                        </Link>
                        <button className={styles.HeaderRightButton} onClick={handleLogout}>
                            Выйти
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/SignUp" className={styles.HeaderRightLink}>
                            <button className={styles.HeaderRightButton}>Регистрация</button>
                        </Link>
                        <Link to="/SignIn" className={styles.HeaderRightLink}>
                            <button className={styles.HeaderRightButton}>Авторизация</button>
                        </Link>
                    </>
                )}
        </div>
        
    </div>
    )
}