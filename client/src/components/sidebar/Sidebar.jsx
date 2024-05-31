import { FiLayout } from "react-icons/fi"
import IconImg from './../../assets/icon.png'
import styles from './Sidebar.module.css'



const Sidebar = () => {

    return (
        <div className = {styles["sidebar"]}>
            <div className={styles["header"]}>
                <img src= {IconImg} alt="Icon"/>
                <h2>Pro Manage</h2>
            </div>
            <div className={styles["nav"]}>
                <div className={styles["nav-links"]}>
                    <div 
                    className = {`${styles["nav-item"]} ${styles["highlight"]}`} >
                    <FiLayout />
                    <p>Board</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
