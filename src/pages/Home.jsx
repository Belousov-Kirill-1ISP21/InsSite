import styles from '../css/Home/homeStyle.module.css'
import { Header } from '../components/General/Header'
import { TitleBlock } from '../components/Home/TitleBlock'
import { AboutBlock } from '../components/Home/AboutBlock'
import { CatalogBlock } from '../components/Home/CatalogBlock/CatalogBlock'
import { WhyUsBlock } from '../components/Home/WhyUsBlock/WhyUsBlock'
import { Footer } from '../components/General/Footer'

export const HomePage = (props)=>{

    return <div className={styles.Wrapper}>
        
        <Header/>
        <TitleBlock/>
        <AboutBlock/>
        <CatalogBlock/>
        <WhyUsBlock/>
        <Footer/>
  
    </div>
}