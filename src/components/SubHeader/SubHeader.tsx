import formatDate from '../../services/formatDate'
import styles from './subHeader.module.scss'

const SubHeader = () => {
  const currentDate = new Date()

  // приводим дату к хорошо читаемому формату
  const formattedDate = formatDate(currentDate)

  return (
    <div className="container">
      <div className={styles.subHeaderWrapper}>
        <h2 className={styles.title}>
          <img src="/images/noise.svg" alt="" />
          Последние новости
        </h2>
        <div className={styles.todayContainer}>
          <div className={styles.todayTitle}>Сегодня</div>
          <div className={styles.todayDate}>{formattedDate}</div>
        </div>
      </div>
    </div>
  )
}

export default SubHeader
