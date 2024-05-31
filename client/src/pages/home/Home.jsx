import Sidebar from '../../components/sidebar/Sidebar'
import { dayAndMonth,year } from '../../utils/timestamp'
import styles from './Home.module.css'
import CardSections from '../../components/sections/CardSections';




const Home = () => {


  return (
    <div className = {styles["home"]}>
      <Sidebar />
      <div className = {styles["main"]}>
        <header>
          <h3>Welcome!</h3>
          <p>{`${dayAndMonth(new Date())}, ${year(new Date())}`}</p>
        </header>
        <main className = {styles["board"]}>
          <div className = {styles['title']}>
            <h3>Board</h3>
          </div>
          <CardSections/>
        </main>
      </div>
    </div>
  )
}

export default Home
