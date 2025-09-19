import styles from '../../../css/Catalog/CatalogBlock/CatalogCardStyle.module.css';
import { Link } from 'react-router-dom';
export const CatalogCard =(props)=>{
    const {CatalogCardH1, CatalogCardText, CatalogCardImg} = props
    return <div className={styles.CatalogCard}>

        <div className={styles.CatalogCardImgContainer}>
            <img src={CatalogCardImg} className={styles.CatalogCardImg}/> 
        </div>
        <div className={styles.CatalogCardInfoContainer}>
            <h1 className={styles.CatalogCardH1}>{CatalogCardH1}</h1>
            <p className={styles.CatalogCardText}>от {CatalogCardText}</p>
            <Link to="/Tarif" className={styles.CatalogCardLink}>
                <button className={styles.CatalogCardButton}>Заказать</button>
            </Link>
        </div>
        
    </div>
}