import styles from '../../css/Order/OrderFormStyle.module.css';
import { Link } from 'react-router-dom';

export const OrderForm =(props)=>{
    return <div className={styles.OrderForm}>

            <div className={styles.OrderFormH1Container}>
                <h1 className={styles.OrderFormH1}>Заполните форму для оформления тарифа</h1>
            </div>

            <form className={styles.OrderFormForm}>

                <div className={styles.OrderFormFormInputContainer}>
                    <div className={styles.OrderFormFormH2Container}>
                        <h2 className={styles.OrderFormFormH2}>Гражданство</h2>
                    </div>
                    <input className={styles.OrderFormFormInput} placeholder='Россия'/>
                </div>

                <div className={styles.OrderFormFormPassportInputContainer}>
                    <div className={styles.OrderFormFormH2Container}>
                        <h2 className={styles.OrderFormFormH2}>Документ, удоставеряющий личность</h2>
                    </div>
                    <input className={styles.OrderFormFormPassportInput} placeholder='Тип документа'/>
                    <input className={styles.OrderFormFormPassportInput} placeholder='Серия'/>
                    <input className={styles.OrderFormFormPassportInput} placeholder='Номер'/>
                </div>

                <div className={styles.OrderFormFormInputContainer}>
                    <div className={styles.OrderFormFormH2Container}>
                        <h2 className={styles.OrderFormFormH2}>Орган, выдавший документ</h2>
                    </div>
                    <input className={styles.OrderFormFormInput} placeholder='Кем выдан'/>
                </div>

                <div className={styles.OrderFormFormInputContainer}>
                    <div className={styles.OrderFormFormH2Container}>
                        <h2 className={styles.OrderFormFormH2}>Дата выдачи</h2>
                    </div>
                    <input className={styles.OrderFormFormInput} placeholder='дд.мм.гггг'/>
                </div>

                <div className={styles.OrderFormFormButtonContainer}>
                    <Link to="/Profile" className={styles.OrderFormFormLink}>
                        <button className={styles.OrderFormFormButton}>Заказать</button>
                    </Link> 
                </div>

            </form>
        
    </div>
}