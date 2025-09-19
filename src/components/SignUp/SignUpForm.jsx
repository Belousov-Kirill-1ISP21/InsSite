import styles from '../../css/SignUp/SignUpFormStyle.module.css';
import { Link } from 'react-router-dom';
export const SignUpForm =(props)=>{
    return <div className={styles.SignUpForm}>

            <form className={styles.SignUpFormForm}>
                <h1 className={styles.SignInFormH1}>Регистрация</h1>
                <input className={styles.SignUpFormFormInput} placeholder='Фамилия'/>
                <input className={styles.SignUpFormFormInput} placeholder='Имя'/>
                <input className={styles.SignUpFormFormInput} placeholder='Отчество'/>
                <input className={styles.SignUpFormFormInput} placeholder='+7 (000) 000-0000'/>
                <input className={styles.SignUpFormFormInput} placeholder='Email'/>
                <input className={styles.SignUpFormFormInput} placeholder='Пароль'/>
                <input className={styles.SignUpFormFormInput} placeholder='Повторите пароль'/>
                <Link to="/Profile" className={styles.SignUpFormFormLink}>
                    <button className={styles.SignUpFormFormButton}>Зарегистрироваться</button>
                </Link>
                <p className={styles.SignUpFormFormText}>By Creating an Account, it means you agree to our Privacy Policy and Terms of Service</p>
            </form>

        
        
    </div>
}