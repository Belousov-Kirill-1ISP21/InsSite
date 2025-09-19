import styles from '../css/Tarif/tarifStyle.module.css'
import TarifImg from '../assets/Tarif/Tarif.png'
import { Header } from '../components/General/Header'
import { TarifBlock } from '../components/Tarif/TarifBlock'
import { Footer } from '../components/General/Footer'
import { SideBackground } from '../components/General/SideBackground'

const TarifBlockProps = [
    {id:0, TarifBlockH1:'ОСАГО', TarifBlockImg: TarifImg, TarifBlockText: 'ОСАГО — обязательный вид страхования по закону, который обязательно требуется при покупке нового автомобиля. Благодаря ОСАГО не нужно возмещать ущерб пострадавшим в ДТП самостоятельно. Компенсация за ущерб имуществу или здоровью третьих лиц производится страховой компанией.', 
    TarifBlockPrice: 'Цена: От 2890₽'},
];

export const TarifPage = (props)=>{

    return <div className={styles.wrapper}>

        <div className={styles.SideBackgroundContainer}>
            <SideBackground isDark={false}/>
        </div>

        <div className={styles.main}>
            <Header/>

            <div className={styles.TarifBlockContainer}>
                {TarifBlockProps.map((TarifBlockInfo,key)=><TarifBlock 
                                                            key={key}
                                                            TarifBlockH1={TarifBlockInfo.TarifBlockH1} 
                                                            TarifBlockImg={TarifBlockInfo.TarifBlockImg}
                                                            TarifBlockText={TarifBlockInfo.TarifBlockText}
                                                            TarifBlockPrice={TarifBlockInfo.TarifBlockPrice}
                                                        />)}
            </div>

            <Footer/>
        </div>

    </div>
}