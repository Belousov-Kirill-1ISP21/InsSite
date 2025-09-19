import styles from '../../../css/Profile/SidePanel/SidePanelLineStyle.module.css'
import { Link } from 'react-router-dom';
import { useAuth } from '../../../scripts/AuthContext.js';

export const SidePanelLine =(props)=>{
    const {logout } = useAuth();
    const {SidePanelLineImg, SidePanelLineButton, isButtonLink, LinkPath, isLogOut} = props
    return <div className={styles.SidePanelLine}>
            <img src={SidePanelLineImg} className={styles.SidePanelLineImg}/>

            {(() => {
                if (isButtonLink) {
                    if (isLogOut) {
                        return (
                            <Link to={LinkPath} className={styles.SidePanelLineButtonLink}>
                                <button className={styles.SidePanelLineButton} onClick={logout}>{SidePanelLineButton}</button>
                            </Link>
                        );
                    }
                    else {
                        return (
                            <Link to={LinkPath} className={styles.SidePanelLineButtonLink}>
                                <button className={styles.SidePanelLineButton}>{SidePanelLineButton}</button>
                            </Link>
                        );
                    }
                } 
                else {
                    return (
                        <div className={styles.SidePanelLineButtonContainer}>
                            <button className={styles.SidePanelLineButton}>{SidePanelLineButton}</button>
                        </div>
                    );
                }

            })()}
            
    </div>
}