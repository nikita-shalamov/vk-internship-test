import React, { useEffect, useState } from 'react'
import styles from './modal.module.scss'
import {
  Button,
  ButtonGroup,
  FormItem,
  FormLayoutGroup,
  Input,
  Textarea,
} from '@vkontakte/vkui'
import itemStore from '../../store/store'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  id?: number
}

const Modal = ({ isOpen, onClose, id }: ModalProps) => {
  const [article, setArticle] = useState<{
    title: string
    description: string
  }>({
    title: '',
    description: '',
  }) // храним состояние формы
  const [isDirty, setIsDirty] = useState(false) // проверка, что данные поменялись

  // при открытии окна добавляем данные в состояние article из mobx состояния
  useEffect(() => {
    if (id !== undefined) {
      const currentArticle = itemStore.items.find((item) => item.id === id)
      if (currentArticle) {
        setArticle({
          title: currentArticle.title,
          description: currentArticle.description,
        })
      }
    }
  }, [id])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target
    setArticle((prev) => ({ ...prev, [id]: value }))
    setIsDirty(true)
  }

  const handleSave = () => {
    if (id) {
      itemStore.changeItem(id, article)
    }

    onClose()
  }

  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>Редактирование новости</h2>
        <FormLayoutGroup mode="vertical">
          <FormItem
            htmlFor="title"
            top="Заголовок"
            style={{ padding: 0, marginTop: 10 }}
          >
            <Input id="title" value={article.title} onChange={handleChange} />
          </FormItem>
          <FormItem
            htmlFor="description"
            top="Описание"
            style={{ padding: 0, marginTop: 10 }}
          >
            <Textarea
              rows={5}
              id="description"
              value={article.description}
              onChange={handleChange}
            />
          </FormItem>
        </FormLayoutGroup>
        <ButtonGroup mode="horizontal" gap="m" style={{ marginTop: 20 }}>
          <Button
            size="m"
            onClick={handleSave}
            disabled={!isDirty || !article.title || !article.description}
          >
            Сохранить
          </Button>
          <Button size="m" mode={'outline'} onClick={onClose}>
            Отменить
          </Button>
        </ButtonGroup>
      </div>
    </div>
  )
}

export default Modal
