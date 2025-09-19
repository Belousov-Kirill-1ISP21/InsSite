import React from 'react';
import {TextInput} from '../../General/TextInput'
export const OrderFormTextInput = (props) => {
    const {h2ClassName, inputClassName, errorClassName, h2Text, placeholder, type, register, error} = props;

    return (<>

            <h2 className={h2ClassName}>{h2Text}</h2>

            <TextInput 
                className={inputClassName} 
                placeholder={placeholder} 
                type={type}
                register={register}
                error={error}
                errorClassName={errorClassName}
            />

        </>
    );
};