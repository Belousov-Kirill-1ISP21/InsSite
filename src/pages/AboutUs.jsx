import styles from '../css/AboutUs/aboutUsStyle.module.css'
import { Header } from '../components/General/Header'
import { AboutTitleBlock } from '../components/AboutUs/AboutTitleBlock'
import { AboutMainBlock } from '../components/AboutUs/AboutMainBlock/AboutMainBlock'
import { Footer } from '../components/General/Footer'

export const AboutUsPage = (props)=>{

    return <div className={styles.wrapper}>

        <Header/>
        <AboutTitleBlock/>
        <AboutMainBlock/>
        <Footer/>

    </div>
}