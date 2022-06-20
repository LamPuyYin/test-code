import { Reducer, useState } from "react"
import Todo from "../../Model/Todo"
import { allAction } from "../allAction"
import { SORT_TYPE } from "../../Enum/SORT_TYPE"
import { FILTER_TYPE } from "../../Enum/FILTER_TYPE"
import { allTagNames } from "../../Model/allTagNames"

interface actionTypes {
  type: string
  data: Todo | string | any
}

export interface todoInitStateType {
  allTodo: Todo[]
  sortType: SORT_TYPE
  filterType: FILTER_TYPE
  filterRange: [Date, Date]
}

const initialState: todoInitStateType = {
  allTodo: [
    new Todo("a", new Date(), allTagNames.OFFICE),
    new Todo("b", new Date(), allTagNames.TEST),
  ],
  sortType: SORT_TYPE.CREATE_DATE,
  filterType: FILTER_TYPE.NONE,
  filterRange: [new Date(), new Date()],
}

const addItem = (state: Todo[], todo: Todo | string): Todo[] => {
  const newTodo: Todo[] = [...state]
  // error handle
  if (todo instanceof Todo) {
    newTodo.push(todo)
  }
  return newTodo
}

const deleteItem = (state: Todo[], todoID: Todo | string): Todo[] => {
  if (typeof todoID === "string") {
    const newTodo = state.filter((e) => e.id !== todoID)
    return newTodo
  }
  return state
}

const editItem = (state: Todo[], todoID: Todo | string): Todo[] => {
  if (todoID instanceof Todo) {
    const newTodo: Todo[] = [...state]
    const index = newTodo.findIndex((e) => e.id === todoID.id)
    newTodo[index].text = todoID.text
    return newTodo
  }
  return state
}

const setItemFinish = (state: Todo[], todoID: Todo | string): Todo[] => {
  if (typeof todoID === "string") {
    const newTodo: Todo[] = [...state]
    const index = newTodo.findIndex((e) => e.id === todoID)
    if (index !== -1) {
      newTodo[index].isFinish = !state[index].isFinish
    }
    return newTodo
  }
  return state
}

const TodoReducer: Reducer<todoInitStateType, actionTypes> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case allAction.SET_ITEM:
      return {
        ...state,
        allTodo: action.data,
      }
    case allAction.ADD_ITEM:
      return {
        ...state,
        allTodo: addItem(state.allTodo, action.data),
      }
    case allAction.DELETE_ITEM:
      return {
        ...state,
        allTodo: deleteItem(state.allTodo, action.data),
      }
    case allAction.EDIT_ITEM:
      return {
        ...state,
        allTodo: editItem(state.allTodo, action.data),
      }

    case allAction.SET_FINISH:
      return {
        ...state,
        allTodo: setItemFinish(state.allTodo, action.data),
      }

    case allAction.SORTING:
      return {
        ...state,
        sortType: action.data,
      }

    case allAction.FILTERING:
      return {
        ...state,
        filterType: action.data,
      }
    case allAction.FILTER_RANGE:
      return {
        ...state,
        filterRange: action.data,
      }
    default:
      return state
  }
}

export default TodoReducer
