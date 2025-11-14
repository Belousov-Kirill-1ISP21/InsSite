import styles from '../css/Profile/profileStyle.module.css'
import { SidePanel } from '../components/Profile/SidePanel/SidePanel'
import { MainPanel } from '../components/Profile/MainPanel/MainPanel'
import { useSelector } from 'react-redux';

const SidePanelProps = [
    {id:0, SidePanelHeadH1:'Фамилия имя', SidePanelHeadText: 'yourname@gmail.com'},
];

const MainPanelProps = [
    {id:0, MainPanelHeadH1:'Личная информация', MainPanelHeadText: 'Основная информация о вашем профиле'},
];

export const ProfilePage = (props)=>{
    const { user } = useSelector(state => state.auth);

    const updatedSidePanelProps = [
        {id:0, 
         SidePanelHeadH1: user?.name || 'Пользователь', 
         SidePanelHeadText: user?.email || 'email@example.com'
        },
    ];

    const updatedMainPanelProps = [
        {id:0, 
         MainPanelHeadH1: user?.name || 'Пользователь', 
         MainPanelHeadText: user?.email || 'Основная информация',
         profileData: user
        },
    ];

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