import styles from '../../../css/Catalog/CatalogBlock/CatalogBlockStyle.module.css';
import CatalogCardImg from "../../../assets/Catalog/CatalogCard.png";
import { CatalogCard } from './CatalogCard'

const CatalogCardProps = [
    {id:0, CatalogCardH1:'Страховой тариф', CatalogCardText: '2890 ₽', CatalogCardImg},
    {id:1, CatalogCardH1:'Страховой тариф', CatalogCardText: '2890 ₽', CatalogCardImg},
    {id:2, CatalogCardH1:'Страховой тариф', CatalogCardText: '2890 ₽', CatalogCardImg},
    {id:3, CatalogCardH1:'Страховой тариф', CatalogCardText: '2890 ₽', CatalogCardImg},
    {id:4, CatalogCardH1:'Страховой тариф', CatalogCardText: '2890 ₽', CatalogCardImg},
    {id:5, CatalogCardH1:'Страховой тариф', CatalogCardText: '2890 ₽', CatalogCardImg},
    {id:6, CatalogCardH1:'Страховой тариф', CatalogCardText: '2890 ₽', CatalogCardImg},
    {id:7, CatalogCardH1:'Страховой тариф', CatalogCardText: '2890 ₽', CatalogCardImg},
];

export const CatalogBlock =(props)=>{
    return <div className={styles.CatalogBlock}>


            <div className={styles.CatalogBlockH1Container}>
                <h1 className={styles.CatalogBlockH1}>Страхование здоровья</h1>
            </div>

            <div className={styles.CatalogBlockContainer}>

                {CatalogCardProps.map((CatalogCardInfo,key)=><CatalogCard 
                                                    key={key}
                                                    CatalogCardH1={CatalogCardInfo.CatalogCardH1} 
                                                    CatalogCardText={CatalogCardInfo.CatalogCardText}
                                                    CatalogCardImg={CatalogCardInfo.CatalogCardImg}
                                                />)}

            </div>
        
    </div>
}