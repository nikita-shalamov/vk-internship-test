import { useCallback, useEffect, useRef, useState } from 'react'
import { Spinner } from '@vkontakte/vkui'
import styles from './articles.module.scss'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import useGetArticles from '../../hooks/useGetArticles'
import ArticlesContainer from '../ArticlesContainer/ArticlesContainer'
import Modal from '../Modal/Modal'
import itemStore from '../../store/store'
import { observer } from 'mobx-react-lite'

const Articles = observer(() => {
  const [page, setPage] = useState<number>(1) // пагинация страниц
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false) // состояние модульного окна
  const { getData, loading, error } = useGetArticles(page) // функция получение новостей, состояние загрузки и ошибки
  const loaderRef = useRef(null)
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined)

  // получение данных при монтировании
  useEffect(() => {
    getData(1)
  }, [])

  // отслеживание долистывания до конца, установка нового значения в пагинации
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading && !error) {
        setPage((prev) => prev + 1)
      }
    })

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current)
      }
    }
  }, [loading])

  // вызов модального окна при изменении элемента
  const changeFunction = useCallback((id: number) => {
    setSelectedId(id)
    setIsModalOpen(true)
  }, [])

  // удаление элемента
  const deleteFunction = useCallback((id: number) => {
    itemStore.removeItem(id)
  }, [])

  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal} id={selectedId}></Modal>
      <div className={styles.articles}>
        <div className="container">
          {itemStore.items && (
            <ArticlesContainer
              news={{ articles: itemStore.items }} // передаем список новостей
              changeFunction={changeFunction}
              deleteFunction={deleteFunction}
            />
          )}
          {loading && <Spinner size="medium" />}
          {error && (
            <ErrorMessage
              text={'Ошибка загрузки новостей!'} // при ошибке выводим сообщение
              onClick={getData}
              page={page}
            />
          )}
        </div>
      </div>
      <div ref={loaderRef} style={{ height: '20px' }}></div>
    </>
  )
})

export default Articles
