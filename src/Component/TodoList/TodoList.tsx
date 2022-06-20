import React, { useEffect, useState } from "react"

import Todo from "../../Model/Todo"
import TodoItem from "./TodoItem/TodoItem"
import { allAction } from "../../Redux/allAction"
import { useDispatch, useSelector } from "react-redux"
import { MODAL_TYPE } from "../../Enum/MODAL_TYPE"
import Modal from "../../Model/Modal"
import { SORT_TYPE } from "../../Enum/SORT_TYPE"
import { FILTER_TYPE } from "../../Enum/FILTER_TYPE"
import { ApplicationState } from "../../Redux/reducers/rootReducer"
import {
  filterDate,
  filterItem,
  sortItem,
} from "../../HelperFunction/TodoHelperFunction"

const TodoList: React.FC<{ items: Todo[] }> = (props) => {
  const dispatch = useDispatch()

  const [newItemName, setNewItemName] = useState<string>("")

  const todos = useSelector((state: ApplicationState) => {
    return state.todoReducer.allTodo
  })

  const [sortedTodo, setSortedTodo] = useState<Todo[]>(todos)

  const sortType = useSelector((state: ApplicationState) => {
    return state.todoReducer.sortType
  })

  const filterType = useSelector((state: ApplicationState) => {
    return state.todoReducer.filterType
  })

  const dateRangeUpdate = useSelector((state: ApplicationState) => {
    return state.todoReducer.filterRange
  })
  useEffect(() => {
    let newSortedTodo = [...todos]
    newSortedTodo = sortItem(newSortedTodo, sortType)
    if (filterType !== FILTER_TYPE.DATE) {
      newSortedTodo = filterItem(newSortedTodo, filterType)
    } else {
      newSortedTodo = filterDate(newSortedTodo, dateRangeUpdate)
    }
    setSortedTodo(newSortedTodo)
  }, [todos])

  useEffect(() => {
    let newSortedTodo = [...todos]
    newSortedTodo = sortItem(newSortedTodo, sortType)
    if (filterType !== FILTER_TYPE.DATE) {
      newSortedTodo = filterItem(newSortedTodo, filterType)
    } else {
      newSortedTodo = filterDate(newSortedTodo, dateRangeUpdate)
    }
    setSortedTodo(newSortedTodo)
  }, [sortType, filterType])

  const setIsFinish = (text: string): void => {
    dispatch({
      type: allAction.SET_FINISH,
      // item id
      data: text,
    })
  }

  const onRemove = (todoID: string): void => {
    console.log(todoID)
    dispatch({
      type: allAction.SET_MODAL,
      Modal: new Modal(MODAL_TYPE.DELETE_TODO, true),
      data: todoID,
    })
  }

  const onEdit = (todoID: string): void => {
    console.log(todoID)
    dispatch({
      type: allAction.SET_MODAL,
      Modal: new Modal(MODAL_TYPE.EDIT_TODO, true),
      data: todoID,
    })
  }

  const onCreate = (inputText: string): void => {
    console.log(inputText)
    dispatch({
      type: allAction.SET_MODAL,
      Modal: new Modal(MODAL_TYPE.CREATE_TODO, true),
      data: inputText,
    })
  }

  const onSort = (sortType: SORT_TYPE): void => {
    dispatch({
      type: allAction.SORTING,
      data: sortType,
    })
  }

  const onFilter = (filterType: FILTER_TYPE): void => {
    dispatch({
      type: allAction.FILTERING,
      data: filterType,
    })
  }

  const dateFilter = (): void => {
    dispatch({
      type: allAction.SET_MODAL,
      Modal: new Modal(MODAL_TYPE.DATE_FILTER, true),
      data: new Date(),
    })
  }

  //Front end display are shown here:
  return (
    <div className="h-3/5">
      <div className="flex justify-between items-center">
        <p className="text-base-100 text-xl font-semibold mx-10">To-do list</p>
        <div className="flex justify-end gap-4 ">
          {/*dropdown button class*/}
          <div className="relative mt-2 dropdown dropdown-hover">
            <label className="btn m-1 px-8">Filter by...</label>
            <ul className="absolute top-14 right-0 dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <a
                  onClick={() => {
                    onFilter(FILTER_TYPE.UPCOMING)
                  }}>
                  Upcoming
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    onFilter(FILTER_TYPE.OVERDUE)
                  }}>
                  Overdue
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    onFilter(FILTER_TYPE.FINISHED)
                  }}>
                  Finished
                </a>
              </li>
              <li>
                <a
                  className="bg-orange-300 my-2 hover:bg-amber-600"
                  onClick={() => {
                    dateFilter()
                  }}>
                  Date
                </a>
              </li>
              <li>
                <a
                  className="bg-accent hover:bg-accent-focus"
                  onClick={() => {
                    onFilter(FILTER_TYPE.NONE)
                  }}>
                  Reset
                </a>
              </li>
            </ul>
          </div>
          <div className="relative mt-2 dropdown dropdown-hover">
            <label className="btn m-1 px-8">Sort by...</label>
            <ul className="absolute top-14 right-0 dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <a
                  onClick={() => {
                    onSort(SORT_TYPE.NAME)
                  }}>
                  Name
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    onSort(SORT_TYPE.DEAD_NEW_TO_OLD)
                  }}>
                  Newest deadline
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    onSort(SORT_TYPE.DEAD_OLD_TO_NEW)
                  }}>
                  Oldest deadline
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    onSort(SORT_TYPE.CREATE_DATE)
                  }}>
                  Create Date
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    onSort(SORT_TYPE.FINISHED)
                  }}>
                  Completed
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    onSort(SORT_TYPE.TAGS)
                  }}>
                  Tags
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <ul className="h-5/6 overflow-auto">
        <div className="article-feed">
          {sortedTodo.map((e: Todo, index: number) => {
            return (
              //call TodoItems components here
              <article className="article">
                <TodoItem
                  key={index}
                  data={e}
                  onRemove={onRemove}
                  onEdit={onEdit}
                  setIsFinish={setIsFinish}
                />
              </article>
            )
          })}
        </div>

        <div className="scroller-status">
          <div className="infinite-scroll-request loader-ellips">...</div>
          <p className="infinite-scroll-last">End of content</p>
          <p className="infinite-scroll-error">No more pages to load</p>
        </div>
      </ul>

      {/*allow user input for next TodoItems*/}
      <div
        style={{
          padding: "10px",
          borderRadius: "0.75em",
          backgroundColor: "rgb(250 250 250)",
          margin: "10px 0",
        }}>
        <input
          type="text"
          placeholder="your next to-do item..."
          className="w-full input input-ghost input-group-lg"
          style={{
            padding: "2px",
            borderRadius: "0.75em",
            backgroundColor: "rgb(250 250 250)",
            margin: "4px 0",
          }}
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
        />
      </div>

      {/*submit*/}
      <button
        className="btn btn-wide btn-lg p-6 mt-2"
        onClick={() => {
          onCreate(newItemName)
          // reset item name
          setNewItemName("")
        }}>
        Submit
      </button>
    </div>
  )
}
export default TodoList
