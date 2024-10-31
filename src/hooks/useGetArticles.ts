import { useEffect, useState } from 'react'
import itemStore from '../store/store'
import { Article } from '../types/ArticleTypes'

const useGetArticles = (page: number) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  // const [news, setNews] = useState<ArticlesTypes | null>(null)

  const getData = async (page: number) => {
    try {
      setError(false)
      setLoading(true)

      // получаем список новостей по API
      const response = await fetch(
        `https://newsapi.org/v2/everything?q="VK Видео" OR "VK Музыка" OR "Mail.ru"&apiKey=6de197e8189f431bbb40764468c45f71&language=ru&page=${page}&pageSize=20`
      )

      // TODO: если запрос успешный, но новости закончились - выводить об этом инфо
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      // так как API не возвращает id, то генерим вручную
      const articlesWithId = data.articles.map((article: Article) => ({
        ...article,
        id: Math.floor(Math.random() * 1000000),
      }))

      // записываем новости в mobx в state
      itemStore.addItems(articlesWithId)
    } catch (error) {
      console.error('Ошибка при получении данных:', error)
      setError(true)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (page >= 2 && !error) {
      getData(page)
    }
  }, [page])

  return { getData, error, loading }
}

export default useGetArticles
