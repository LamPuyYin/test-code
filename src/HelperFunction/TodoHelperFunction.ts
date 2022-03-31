import Todo from "../Model/Todo"
import { SORT_TYPE } from "../Enum/SORT_TYPE"
import { FILTER_TYPE } from "../Enum/FILTER_TYPE"

const sortItem = (state: Todo[], sortType: SORT_TYPE): Todo[] => {
  if (sortType === SORT_TYPE.CREATE_DATE) {
    const tmpArr: Todo[] = [...state]
    return tmpArr.sort(
      (a, b) => b.createDate.getTime() - a.createDate.getTime()
    )
  } else if (sortType === SORT_TYPE.DEAD_NEW_TO_OLD) {
    const tmpArr: Todo[] = [...state]
    return tmpArr.sort((a, b) => b.deadLine.getTime() - a.deadLine.getTime())
  } else if (sortType === SORT_TYPE.DEAD_OLD_TO_NEW) {
    const tmpArr: Todo[] = [...state]
    return tmpArr.sort((a, b) => a.deadLine.getTime() - b.deadLine.getTime())
  } else if (sortType === SORT_TYPE.NAME) {
    const tmpArr: Todo[] = [...state]
    return tmpArr.sort(function (a, b) {
      const nameA = a.text.toLowerCase(),
        nameB = b.text.toLowerCase()

      if (nameA < nameB) {
        return -1
      }
      if (nameA > nameB) {
        return 1
      }
      return 0
    })
  } else if (sortType === SORT_TYPE.FINISHED) {
    const tmpArr: Todo[] = [...state]
    return tmpArr.sort((a, b) => Number(a.isFinish) - Number(b.isFinish))
  }
  console.log("error, invalid SORT_TYPE")

  return state
}

const filterItem = (state: Todo[], filterType: FILTER_TYPE): Todo[] => {
  if (filterType === FILTER_TYPE.UPCOMING) {
    const tmpArr: Todo[] = [...state]
    return tmpArr.filter(function (item) {
      const currentDate = new Date()
      let isOverdue = false

      if (item.deadLine.getTime() < currentDate.getTime()) {
        isOverdue = true
      }
      return !isOverdue && !item.isFinish
    })
  } else if (filterType === FILTER_TYPE.OVERDUE) {
    const tmpArr: Todo[] = [...state]
    return tmpArr.filter(function (item) {
      const currentDate = new Date()
      let isOverdue = false

      if (item.deadLine.getTime() < currentDate.getTime()) {
        isOverdue = true
      }
      return isOverdue && !item.isFinish
    })
  } else if (filterType === FILTER_TYPE.FINISHED) {
    const tmpArr: Todo[] = [...state]
    return tmpArr.filter((item) => item.isFinish)
  } else if (filterType === FILTER_TYPE.NONE) {
    return [...state]
  }
  console.log("error, invalid FILTER_TYPE")

  return state
}

export { sortItem, filterItem }
