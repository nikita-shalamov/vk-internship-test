import styles from './header.module.scss'

const Header = () => {
  return (
    <div>
      <div className={styles.headerWrapper}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>Главные новости сервисов </h1>
        </div>
        <div className={styles.logos}>
          <img className={styles.logo} src="/logos/vk-video.svg" alt="" />
          <img className={styles.logo} src="/logos/vk-music.svg" alt="" />
          <img className={styles.logo} src="/logos/mail.svg" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Header
