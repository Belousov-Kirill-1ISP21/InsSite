import styles from '../../css/Tarif/TarifBlockStyle.module.css';
import { Link } from 'react-router-dom';

export const TarifBlock =(props)=>{
    const {TarifBlockH1, TarifBlockImg, TarifBlockText, TarifBlockPrice } = props
    return <div className={styles.TarifBlock}>

        <div className={styles.TarifBlockH1Container}>
            <h1 className={styles.TarifBlockH1}>{TarifBlockH1}</h1>
        </div>

        <div className={styles.TarifBlockInfoContainer}>
            <div className={styles.TarifBlockInfoImgContainer}>
                <img src={TarifBlockImg} className={styles.TarifBlockImg}/> 
            </div>
            <div className={styles.TarifBlockInfoTextContainer}>
                <p className={styles.TarifBlockText}>{TarifBlockText}</p>
                <p className={styles.TarifBlockPrice}>{TarifBlockPrice}</p> <p className={styles.TarifBlockText}>в зависимости от условий.</p>
            </div>
        </div>
        
        <div className={styles.TarifBlockButtonContainer}>
            <Link to="/Order" className={styles.TarifBlockLink}>
                <button className={styles.TarifBlockButton}>Расчитать цену</button>
            </Link>
        </div>
        
    </div>

}