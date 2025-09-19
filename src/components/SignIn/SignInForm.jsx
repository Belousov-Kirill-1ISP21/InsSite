import styles from '../../css/SignIn/SignInFormStyle.module.css';
import { Link } from 'react-router-dom';
export const SignInForm =(props)=>{
    return <div className={styles.SignInForm}>

            <form className={styles.SignInFormForm}>
                <h1 className={styles.SignInFormH1}>Вход в аккаунт</h1>
                <input className={styles.SignInFormFormInput}/>
                <input className={styles.SignInFormFormInput}/>
                <div className={styles.SignInFormFormContainer}>
                    <div className={styles.SignInFormFormCheckboxContainer}>
                        <input type="checkbox" className={styles.SignInFormFormCheckbox} id="RememberMeCheckBox" name="RememberMe"/>
                        <label for="RememberMeCheckBox" className={styles.SignInFormFormCheckboxLabel}>Remember Me</label> 
                    </div>
                    <button className={styles.SignInFormFormForgotPasswordButton}>Забыли пароль?</button>
                </div>
                <Link to="/Profile" className={styles.SignInFormFormLink}>
                    <button className={styles.SignInFormFormButton}>Войти</button>
                </Link>
            </form>
        
    </div>

}