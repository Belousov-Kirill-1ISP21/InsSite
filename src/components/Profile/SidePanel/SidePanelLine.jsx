import styles from '../../../css/Profile/SidePanel/SidePanelLineStyle.module.css'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/slices/authSlice';

export const SidePanelLine =(props)=>{
    const dispatch = useDispatch();
    const {SidePanelLineImg, SidePanelLineButton, isButtonLink, LinkPath, isLogOut} = props
    
    const handleLogout = () => {
        dispatch(logout());
    };

    return <div className={styles.SidePanelLine}>
            <img src={SidePanelLineImg} className={styles.SidePanelLineImg}/>

            {(() => {
                if (isButtonLink) {
                    if (isLogOut) {
                        return (
                            <Link to={LinkPath} className={styles.SidePanelLineButtonLink}>
                                <button className={styles.SidePanelLineButton} onClick={handleLogout}>{SidePanelLineButton}</button>
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