import { daysOfWeek } from '../constants/dayOfWeek'
import { months } from '../constants/months'

const formatDate = (date: Date) => {
  const dayOfWeek = daysOfWeek[date.getDay()]
  const day = date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()

  const formattedDate = `${dayOfWeek}, ${day} ${month} ${year}`

  return formattedDate
}

export default formatDate
