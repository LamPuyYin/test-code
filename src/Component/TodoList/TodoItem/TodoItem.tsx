import React from "react"

import Todo from "../../../Model/Todo"

interface propsState {
  data: Todo
  setIsFinish: (id: string) => void
  onRemove: (id: string) => void
  onEdit: (id: string) => void
}

const TodoItem: React.FC<propsState> = (props) => {
  return (
    <li
      key={props.data.id}
      style={
        props.data.isFinish
          ? { backgroundColor: "lightseagreen" }
          : { backgroundColor: "rgb(240 253 250)" }
      }
      className="grid-cols-1 grid	gap-4 p-2 m-4 card shadow-sm text-accent-content place-items-center">
      <div className="col-end-1">
        <input
          style={
            props.data.isFinish
              ? { backgroundColor: "turquoise" }
              : { backgroundColor: "rgb(240 253 250)" }
          }
          type="checkbox"
          className="checkbox checkbox-lg checkbox-accent"
          onClick={() => props.setIsFinish(props.data.id)}
        />
      </div>
      <div
        className="justify-self-start pl-6"
        style={
          props.data.isFinish
            ? { textDecoration: "underline", color: "darkslategrey" }
            : { color: "black" }
        }>
        {props.data.text}
      </div>

      <div className="col-end-7">
        <button
          style={
            props.data.isFinish
              ? { backgroundColor: "turquoise" }
              : { backgroundColor: "rgb(19 78 74)" }
          }
          className="btn btn-sm"
          onClick={() => props.onEdit(props.data.id)}>
          edit
        </button>
      </div>

      <div className="col-end-8">
        <button
          style={
            props.data.isFinish
              ? { backgroundColor: "turquoise" }
              : { backgroundColor: "rgb(19 78 74)" }
          }
          className="btn btn-circle btn-sm"
          onClick={() => props.onRemove(props.data.id)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-current">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </li>
  )
}
export default TodoItem