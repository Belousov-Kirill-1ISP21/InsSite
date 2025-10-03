import styles from '../css/Profile/profileStyle.module.css'
import { SidePanel } from '../components/Profile/SidePanel/SidePanel'
import { MainPanel } from '../components/Profile/MainPanel/MainPanel'
import { useProfile } from '../hooks/useProfile'

const SidePanelProps = [
    {id:0, SidePanelHeadH1:'Фамилия имя', SidePanelHeadText: 'yourname@gmail.com'},
];

const MainPanelProps = [
    {id:0, MainPanelHeadH1:'Личная информация', MainPanelHeadText: 'Основная информация о вашем профиле'},
];

export const ProfilePage = (props)=>{
    // ✅ React Query хук
    const { data: profile, isLoading, error } = useProfile()

    // ✅ ОБНОВЛЯЕМ ПРОПСЫ С ДАННЫМИ ИЗ API
    const updatedSidePanelProps = [
        {id:0, 
         SidePanelHeadH1: profile?.name || 'Загрузка...', 
         SidePanelHeadText: profile?.email || 'Загрузка...'
        },
    ];

    const updatedMainPanelProps = [
        {id:0, 
         // ✅ ЗАМЕНЯЕМ НА ИМЯ ПОЛЬЗОВАТЕЛЯ И ПОЧТУ
         MainPanelHeadH1: profile?.name || 'Загрузка...', 
         MainPanelHeadText: profile?.email || 'Загрузка...',
         profileData: profile
        },
    ];

    if (isLoading) {
        return <div className={styles.wrapper}>
            <div className={styles.PanelsContainer}>
                <div className={styles.SidePanelContainer}>
                    {SidePanelProps.map((SidePanelInfo,key)=><SidePanel 
                                                        key={key}
                                                        SidePanelHeadH1="Загрузка..." 
                                                        SidePanelHeadText="Загрузка..."
                                                    />)}
                </div>
                <div className={styles.MainPanelContainer}>
                    {MainPanelProps.map((MainPanelInfo,key)=><MainPanel 
                                                        key={key}
                                                        MainPanelHeadH1="Загрузка..." 
                                                        MainPanelHeadText="Загрузка данных..."
                                                    />)}
                </div>
            </div>
        </div>
    }

    if (error) {
        return <div className={styles.wrapper}>
            <div className={styles.PanelsContainer}>
                <div className={styles.SidePanelContainer}>
                    {SidePanelProps.map((SidePanelInfo,key)=><SidePanel 
                                                        key={key}
                                                        SidePanelHeadH1="Ошибка" 
                                                        SidePanelHeadText="Не удалось загрузить"
                                                    />)}
                </div>
                <div className={styles.MainPanelContainer}>
                    {MainPanelProps.map((MainPanelInfo,key)=><MainPanel 
                                                        key={key}
                                                        MainPanelHeadH1="Ошибка" 
                                                        MainPanelHeadText={error.message}
                                                    />)}
                </div>
            </div>
        </div>
    }

    return <div className={styles.wrapper}>

        <div className={styles.PanelsContainer}>

            <div className={styles.SidePanelContainer}>

                {updatedSidePanelProps.map((SidePanelInfo,key)=><SidePanel 
                                                    key={key}
                                                    SidePanelHeadH1={SidePanelInfo.SidePanelHeadH1} 
                                                    SidePanelHeadText={SidePanelInfo.SidePanelHeadText}
                                                />)}

            </div>

            <div className={styles.MainPanelContainer}>

                {updatedMainPanelProps.map((MainPanelInfo,key)=><MainPanel 
                                                    key={key}
                                                    MainPanelHeadH1={MainPanelInfo.MainPanelHeadH1} 
                                                    MainPanelHeadText={MainPanelInfo.MainPanelHeadText}
                                                    profileData={MainPanelInfo.profileData}
                                                />)}

            </div>

        </div>

    </div>
}