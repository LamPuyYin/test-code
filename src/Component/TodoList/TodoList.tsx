import React, { useState } from "react"

import Todo from "../../Model/Todo"
import TodoItem from "./TodoItem/TodoItem"
import { allAction } from "../../Redux/allAction"
import { useDispatch } from "react-redux"
import { MODAL_TYPE } from "../../Enum/MODAL_TYPE"
import Modal from "../../Model/Modal"

const TodoList: React.FC<{ items: Todo[] }> = (props) => {
  const dispatch = useDispatch()

  const [newItemName, setNewItemName] = useState<string>("")

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

  const onCreate = (text: string): void => {
    dispatch({
      type: allAction.ADD_ITEM,
      data: new Todo(text),
    })
  }
  return (
    <div className="h-5/6">
      <ul className="h-4/5 overflow-auto">
        {props.items.map((e: Todo, index: number) => {
          return (
            <TodoItem
              key={index}
              data={e}
              onRemove={onRemove}
              onEdit={onEdit}
              setIsFinish={setIsFinish}
            />
          )
        })}
      </ul>
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

      <button
        className="btn btn-wide btn-lg p-6"
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
