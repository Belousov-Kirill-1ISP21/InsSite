import styles from '../css/Catalog/catalogStyle.module.css'
import { Header } from '../components/General/Header'
import { CatalogBlock } from '../components/Catalog/CatalogBlock/CatalogBlock'
import { Footer } from '../components/General/Footer'
import { SideBackground } from '../components/General/SideBackground'

export const CatalogPage = (props)=>{

    return <div className={styles.wrapper}>

        <div className={styles.SideBackgroundContainer}>
            <SideBackground isDark={false}/>
        </div>
        <div className={styles.main}>
            <Header/>
            <CatalogBlock/>
            <Footer/>
        </div>

    </div>
}


                            
                    
                
    
                