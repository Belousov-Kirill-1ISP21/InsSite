import styles from '../../../css/Home/CatalogBlock/CatalogBlockStyle.module.css';
import { CatalogCard } from './CatalogCard'

const CatalogBlockCardProps = [
    {id:0, CatalogBlockCardH1:'Страхование жизни', CatalogBlockCardText: '2890 ₽'},
    {id:1, CatalogBlockCardH1:'Страхование здоровья', CatalogBlockCardText: '2890 ₽'},
    {id:2, CatalogBlockCardH1:'Страхование имущества', CatalogBlockCardText: '2890 ₽'},
    {id:3, CatalogBlockCardH1:'Страхование финансов', CatalogBlockCardText: '2890 ₽'},
    {id:4, CatalogBlockCardH1:'Страхование авто', CatalogBlockCardText: '2890 ₽'},
    {id:5, CatalogBlockCardH1:'Страхование путешествий', CatalogBlockCardText: '2890 ₽'},
];

export const CatalogBlock =(props)=>{
    return <div className={styles.CatalogBlock}>

        <div className={styles.CatalogBlockHead}>
            <h1 className={styles.CatalogBlockHeadH1}>Выберите продукт</h1>
            <p className={styles.CatalogBlockHeadText}>Подберите страховой продукт, который наилучшим образом подойдёт именно Вам</p>
        </div>

        <div className={styles.CatalogBlockContainer}>

            {CatalogBlockCardProps.map((CatalogBlockCardInfo,key)=><CatalogCard 
                                                    key={key}
                                                    CatalogBlockCardH1={CatalogBlockCardInfo.CatalogBlockCardH1} 
                                                    CatalogBlockCardText={CatalogBlockCardInfo.CatalogBlockCardText}
                                                />)}

        </div>
        
    </div>
}