import styles from '../../css/General/HeaderStyle.module.css';
import React from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../scripts/AuthContext.js';
import { usePrefetchPolicies } from '../../hooks'; 

export const Header = () => {
    const { isAuthenticated } = useAuth();
    const prefetchPolicies = usePrefetchPolicies(); 

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
                        onMouseEnter={prefetchPolicies} 
                    >
                        Админ панель
                    </Link>
                </button>

                <button className={styles.HeaderLeftButton}>
                    <Link 
                        to="/Catalog" 
                        className={styles.HeaderLeftButtonContainerLink}
                        onMouseEnter={prefetchPolicies} 
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