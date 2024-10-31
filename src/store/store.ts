import { makeAutoObservable } from 'mobx'
import { Article } from '../types/ArticleTypes'

const createStore = () => {
  const store = {
    items: [] as Article[],

    // добавление новостей
    addItems(newItems: Article[]) {
      store.items = [...store.items, ...newItems]
    },

    // удаление элемента (новости)
    removeItem(id: number) {
      store.items = store.items.filter((item) => item.id !== id)
    },

    // изменение новости
    // TODO: сделать так, чтобы рендерилась только изменяемая новость
    changeItem(id: number, data: { title?: string; description?: string }) {
      const index = store.items.findIndex((item) => item.id === id)
      if (index !== -1) {
        store.items = store.items.map((item, idx) =>
          idx === index ? { ...item, ...data } : item
        )
      }
    },
  }

  makeAutoObservable(store)
  return store
}

const itemStore = createStore()
export default itemStore
