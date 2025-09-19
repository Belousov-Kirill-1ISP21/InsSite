import styles from '../css/Order/orderStyle.module.css'
import { Header } from '../components/General/Header'
import { OrderForm } from '../components/Order/OrderForm/OrderForm.jsx'
import { SideBackground } from '../components/General/SideBackground'

export const OrderPage = (props)=>{

    return <div className={styles.wrapper}>

        <div className={styles.SideBackgroundContainer}>
            <SideBackground isDark={false}/>
        </div>

        <div className={styles.main}>
            <Header/>
            <OrderForm/>
        </div>
        
    </div>
}