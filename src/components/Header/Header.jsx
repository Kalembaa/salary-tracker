import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'

function Header() {
  const getLinkClassName = ({ isActive }) =>
    `${styles.link} ${isActive ? styles.active : ''}`

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>Salary Tracker</div>

        <nav className={styles.nav}>
          <NavLink to="/" end className={getLinkClassName}>
            Главная
          </NavLink>

          <NavLink to="/history" className={getLinkClassName}>
            История
          </NavLink>

          <NavLink to="/analytics" className={getLinkClassName}>
            Аналитика
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header
