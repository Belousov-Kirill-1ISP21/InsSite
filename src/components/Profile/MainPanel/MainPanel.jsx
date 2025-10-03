import styles from '../../../css/Profile/MainPanel/MainPanelStyle.module.css'
import { MainPanelLine } from './MainPanelLine'

export const MainPanel = (props) => {
    const { MainPanelHeadH1, MainPanelHeadText, profileData } = props
    
    const MainPanelLineProps = [
        {id:0, MainPanelLineH1:'Имя', MainPanelLineText: profileData?.name || 'Не указано'},
        {id:1, MainPanelLineH1:'Email', MainPanelLineText: profileData?.email || 'Не указан'},
        {id:2, MainPanelLineH1:'Телефон', MainPanelLineText: profileData?.phone || 'Не указан'},
        {id:3, MainPanelLineH1:'Имя пользователя', MainPanelLineText: profileData?.username || 'Не указано'},
    ];

    return <div className={styles.MainPanel}>
        
        <div className={styles.MainPanelHead}>
            <h1 className={styles.MainPanelHeadH1}>{MainPanelHeadH1}</h1>
            <p className={styles.MainPanelHeadText}>{MainPanelHeadText}</p>
        </div>

        <div className={styles.MainPanelContainer}>

            {MainPanelLineProps.map((MainPanelInfo,key)=><MainPanelLine 
                                                    key={key}
                                                    MainPanelLineH1={MainPanelInfo.MainPanelLineH1} 
                                                    MainPanelLineText={MainPanelInfo.MainPanelLineText}
                                                />)}
            
        </div>

        <div className={styles.MainPanelButtonContainer}>
            <button className={styles.MainPanelButton}>Сохранить изменения</button>
        </div>
            
    </div>
}