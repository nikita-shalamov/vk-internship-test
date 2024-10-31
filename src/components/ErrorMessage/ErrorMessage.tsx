import { Button } from '@vkontakte/vkui'
import styles from './errorMessage.module.scss'

interface errorMessageProps {
  text: string
  onClick?: (page: number) => void
  page: number
}

const ErrorMessage = ({ text, onClick, page }: errorMessageProps) => {
  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.errorMessage}>{text}</div>
        {onClick ? (
          <Button
            onClick={() => {
              onClick(page)
            }}
            size="l"
            style={{ maxWidth: 150 }}
            stretched
          >
            Повторить
          </Button>
        ) : null}
      </div>
    </div>
  )
}

export default ErrorMessage
