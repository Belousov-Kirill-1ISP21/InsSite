import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from '../../../css/Authentication/SignIn/SignInFormStyle.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/slices/authSlice';
import { TextInput } from '../../General/TextInput.jsx';
import { AuthCheckBox } from '../General/AuthCheckBox.jsx';

const signInSchema = yup.object().shape({
  email: yup
    .string()
    .email('Введите корректный email')
    .required('Email обязателен для заполнения'),
  password: yup
    .string()
    .min(6, 'Пароль должен содержать минимум 6 символов')
    .required('Пароль обязателен для заполнения'),
  rememberMe: yup
    .boolean()
});

export const SignInForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.auth);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(signInSchema) 
    });

    const onSubmit = async (data) => {
        try {
            await dispatch(loginUser(data)).unwrap();
            navigate('/Profile');
        } catch (error) {
            console.error('Ошибка входа:', error);
        }
    };

    const TextInputProps = [
        {id:0, className: styles.SignInFormFormInput, placeholder: "Email", type: "email", register: register('email'), error: errors.email, errorClassName: styles.errorMessage},
        {id:1, className: styles.SignInFormFormInput, placeholder: "Пароль", type: "password", register: register('password'), error: errors.password, errorClassName: styles.errorMessage},
    ];

    return (
      <div className={styles.SignInForm}>
          <form 
              className={styles.SignInFormForm} 
              onSubmit={handleSubmit(onSubmit)}
          >
              <h1 className={styles.SignInFormH1}>Вход в аккаунт</h1>
              
              {TextInputProps.map((TextInputInfo,key)=><TextInput 
                                        key={key}
                                        className={TextInputInfo.className} 
                                        placeholder={TextInputInfo.placeholder} 
                                        type={TextInputInfo.type}
                                        register={TextInputInfo.register}
                                        error={TextInputInfo.error}
                                        errorClassName={TextInputInfo.errorClassName}
                                    />)}
              
              {error && (
                  <div className={styles.errorMessage}>
                      {error}
                  </div>
              )}

              <div className={styles.SignInFormFormContainer}>

                  <AuthCheckBox id="RememberMeCheckBox" register={register('rememberMe')} labelText='Remember Me'/>

                  <button type="button" className={styles.SignInFormFormForgotPasswordButton}>
                      Забыли пароль?
                  </button>
                  
              </div>
              
              <button 
                  type="submit" 
                  className={styles.SignInFormFormButton}
                  disabled={loading}
              >
                  {loading ? 'Загрузка...' : 'Войти'}
              </button>
              
          </form>
      </div>
  );
};