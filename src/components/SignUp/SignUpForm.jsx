import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from '../../../css/Authentication/SignUp/SignUpFormStyle.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../store/slices/authSlice';
import { TextInput } from '../../General/TextInput.jsx';

const schema = yup.object().shape({
    surname: yup.string().required('Фамилия обязательна'),
    name: yup.string().required('Имя обязательно'),
    patronymic: yup.string().required('Отчество обязательно'),
    phone: yup.string()
        .matches(
            /^\+7\d{3}\d{3}\d{4}$/, 
            'Телефон должен быть в формате +70000000000 (11 цифр после +7)'
        )
        .required('Телефон обязателен'),
    email: yup.string().email('Неверный формат Email').required('Email обязателен'),
    password: yup.string().min(6, 'Пароль должен содержать минимум 6 символов').required('Пароль обязателен'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
        .required('Подтверждение пароля обязательно'),
});

export const SignUpForm = (props) => {
    const navigate = useNavigate(); 
    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.auth);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            await dispatch(registerUser(data)).unwrap();
            navigate('/Profile');
        } catch (error) {
            console.error('Ошибка регистрации:', error);
        }
    };

    const TextInputProps = [
        {id:0, className: styles.SignUpFormFormInput, placeholder: "Фамилия", type: "text", register: register('surname'), error: errors.surname, errorClassName: styles.errorMessage},
        {id:1, className: styles.SignUpFormFormInput, placeholder: "Имя", type: "text", register: register('name'), error: errors.name, errorClassName: styles.errorMessage},
        {id:2, className: styles.SignUpFormFormInput, placeholder: "Отчество", type: "text", register: register('patronymic'), error: errors.patronymic, errorClassName: styles.errorMessage},
        {id:3, className: styles.SignUpFormFormInput, placeholder: "+70000000000", type: "phone", register: register('phone'), error: errors.phone, errorClassName: styles.errorMessage},
        {id:4, className: styles.SignUpFormFormInput, placeholder: "Email", type: "email", register: register('email'), error: errors.email, errorClassName: styles.errorMessage},
        {id:5, className: styles.SignUpFormFormInput, placeholder: "Пароль", type: "password", register: register('password'), error: errors.password, errorClassName: styles.errorMessage},
        {id:6, className: styles.SignUpFormFormInput, placeholder: "Повторите пароль", type: "password", register: register('confirmPassword'), error: errors.confirmPassword, errorClassName: styles.errorMessage},
    ];

    return (
      <div className={styles.SignUpForm}>
          <form className={styles.SignUpFormForm} onSubmit={handleSubmit(onSubmit)}>
              <h1 className={styles.SignInFormH1}>Регистрация</h1>

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

              <button 
                  type="submit" 
                  className={styles.SignUpFormFormButton}
                  disabled={loading}
              >
                  {loading ? 'Регистрация...' : 'Зарегистрироваться'}
              </button>

              <p className={styles.SignUpFormFormText}>
                  By Creating an Account, it means you agree to our Privacy Policy and Terms of Service
              </p>
          </form>
      </div>
  );
};