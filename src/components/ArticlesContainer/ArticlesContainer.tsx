import { memo } from 'react'
import styles from '../Articles/articles.module.scss'
import { ArticlesTypes } from '../../types/ArticlesTypes'
import { ContentCard } from '@vkontakte/vkui'
import SettingsPopover from '../SettingsPopover/SettingsPopover'
import { Article } from '../../types/ArticleTypes'

interface ArticlesContainerProps {
  news: ArticlesTypes
  deleteFunction: (id: number) => void
  changeFunction: (id: number) => void
}

const ArticlesContainer = ({
  news,
  changeFunction,
  deleteFunction,
}: ArticlesContainerProps) => {
  return (
    <div>
      {news && news.articles && (
        <div className={styles.articlesWrapper}>
          {news.articles.map((article, index) => (
            <div key={index} style={{ position: 'relative' }}>
              {/* Кнопка с командами изменения/удаления новости */}
              <SettingsPopover
                id={article.id}
                changeFunction={changeFunction}
                deleteFunction={deleteFunction}
              />
              {/* Карточка новости */}
              <ContentCard
                src={article.urlToImage}
                alt="News thumbnail"
                header={article.title}
                text={article.description}
                subtitle={new Date(article.publishedAt).toLocaleDateString()}
                maxHeight={180}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// добавляем мемо, чтобы убрать лишние ререндеры
export default memo(ArticlesContainer, (prevProps, nextProps) => {
  return (
    prevProps.news.articles.length === nextProps.news.articles.length &&
    prevProps.news.articles.every((article, index) =>
      areArticlesEqual(article, nextProps.news.articles[index])
    )
  )
})

// делаем глубокое сравнение пропсов
const areArticlesEqual = (prevArticle: Article, nextArticle: Article) => {
  return (
    prevArticle.id === nextArticle.id &&
    prevArticle.title === nextArticle.title &&
    prevArticle.description === nextArticle.description &&
    prevArticle.url === nextArticle.url &&
    prevArticle.publishedAt === nextArticle.publishedAt &&
    prevArticle.urlToImage === nextArticle.urlToImage
  )
}
