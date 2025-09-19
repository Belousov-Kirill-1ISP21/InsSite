import React from 'react';
import styles from '../../../css/Authentication/General/AuthCheckBoxStyle.module.css'; 

export const AuthCheckBox = (props) => {
    const {id, register, labelText} = props;

    return (<>

            <div className={styles.AuthCheckboxContainer}>
                        <input 
                            className={styles.AuthCheckbox} 
                            type="checkbox"
                            id={id}
                            {...register} 
                        />
                        <label htmlFor={id} className={styles.AuthCheckboxLabel}>
                            {labelText}
                        </label> 
            </div>
            
        </>
    );
};