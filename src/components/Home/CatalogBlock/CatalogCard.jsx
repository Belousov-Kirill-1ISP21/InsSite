import styles from '../../../css/Home/CatalogBlock/CatalogCardStyle.module.css';
import { Link } from 'react-router-dom';

export const CatalogCard =(props)=>{
    const {CatalogBlockCardH1, CatalogBlockCardText} = props
    return <div className={styles.CatalogBlockCard}>

        <div className={styles.CatalogBlockCardContainer}>
            <h1 className={styles.CatalogBlockCardH1}>{CatalogBlockCardH1}</h1>
        </div>
        <div className={styles.CatalogBlockCardContainer}>
            <p className={styles.CatalogBlockCardText}>от </p> <p className={styles.CatalogBlockCardTextInText}>{CatalogBlockCardText}</p>
        </div> 
        <div className={styles.CatalogBlockCardContainer}>
            <Link to="/Catalog" className={styles.CatalogBlockCardContainerLink}>
                <button className={styles.CatalogBlockCardButton}>Заказать</button>
            </Link>
        </div>

    </div>
}