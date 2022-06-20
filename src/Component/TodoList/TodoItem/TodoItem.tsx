import React from "react"
import Todo from "../../../Model/Todo"
import { allTagNames } from "../../../Model/allTagNames"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface propsState {
  data: Todo
  setIsFinish: (id: string) => void
  onRemove: (id: string) => void
  onEdit: (id: string) => void
}
import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
library.add(fas)

const TodoItem: React.FC<propsState> = (props) => {
  const currentDate = new Date()
  let isOverdue = false

  if (props.data.deadLine.getTime() < currentDate.getTime()) {
    isOverdue = true
  }

  //display tags (i.e. icons)
  const tagName = props.data.tag
  const TodoTags: React.FC = () => {
    if (tagName === allTagNames.TEST) {
      return (
        <div className="badge badge-lg gap-2 badge-primary col-end-6">
          <FontAwesomeIcon
            icon={{ prefix: "fas", iconName: "wrench" }}
            className="inline-block w-4 h-4 stroke-current"
          />
          {tagName}
        </div>
      )
    } else if (tagName === allTagNames.GENERAL) {
      return (
        <div className="badge badge-lg gap-2 badge-primary col-end-6">
          <FontAwesomeIcon
            icon={{ prefix: "fas", iconName: "coffee" }}
            className="inline-block w-4 h-4 stroke-current"
          />
          {tagName}
        </div>
      )
    } else if (tagName === allTagNames.HOME) {
      return (
        <div className="badge badge-lg gap-2 badge-primary col-end-6">
          <FontAwesomeIcon
            icon={{ prefix: "fas", iconName: "house" }}
            className="inline-block w-4 h-4 stroke-current"
          />
          {tagName}
        </div>
      )
    } else if (tagName === allTagNames.OFFICE) {
      return (
        <div className="badge badge-lg gap-2 badge-primary col-end-6">
          <FontAwesomeIcon
            icon={{ prefix: "fas", iconName: "buildings" }}
            className="inline-block w-4 h-4 stroke-current"
          />
          {tagName}
        </div>
      )
    } else if (tagName === allTagNames.SCHOOL) {
      return (
        <div className="badge badge-lg gap-2 badge-primary col-end-6">
          <FontAwesomeIcon
            icon={{ prefix: "fas", iconName: "graduation-cap" }}
            className="inline-block w-4 h-4 stroke-current"
          />
          {tagName}
        </div>
      )
    } else if (tagName === allTagNames.IMPORTANT) {
      return (
        <div className="badge badge-lg gap-2 badge-primary col-end-6">
          <FontAwesomeIcon
            icon={{ prefix: "fas", iconName: "triangle-exclamation" }}
            className="inline-block w-4 h-4 stroke-current"
          />
          {tagName}
        </div>
      )
    }

    return <div />
  }

  //front end display are shown here
  return (
    // an item containing the information of one Todo
    <li
      key={props.data.id}
      style={
        !props.data.isFinish
          ? !isOverdue
            ? { backgroundColor: "rgb(240 253 250)" }
            : { backgroundColor: "lightcoral" }
          : { backgroundColor: "lightseagreen" }
      }
      className="grid-cols-1 grid	gap-4 p-2 m-4 card shadow-sm text-accent-content place-items-center">
      {/*checkbox display*/}
      <div className="col-end-1">
        <input
          style={
            !props.data.isFinish
              ? !isOverdue
                ? { backgroundColor: "rgb(240 253 250)" }
                : { backgroundColor: "lightpink", borderColor: "lightpink" }
              : { backgroundColor: "turquoise" }
          }
          type="checkbox"
          checked={props.data.isFinish}
          className="checkbox checkbox-lg checkbox-accent"
          onClick={() => props.setIsFinish(props.data.id)}
        />
      </div>

      {/*Todo description*/}
      <div
        className="justify-self-start pl-6 col-span-3"
        style={
          !props.data.isFinish
            ? !isOverdue
              ? { color: "black" }
              : { color: "white" }
            : { textDecoration: "underline", color: "darkslategrey" }
        }>
        {props.data.text + " "}
        {props.data.dateFormat()}
      </div>
      <TodoTags />

      {/*edit Todo*/}
      <div className="col-end-7">
        <button
          style={
            !props.data.isFinish
              ? !isOverdue
                ? { backgroundColor: "rgb(19 78 74)" }
                : { backgroundColor: "lightpink", borderColor: "lightpink" }
              : { backgroundColor: "turquoise", borderColor: "turquoise" }
          }
          className="btn btn-sm"
          onClick={() => props.onEdit(props.data.id)}>
          edit
        </button>
      </div>

      {/*delete Todo*/}
      <div className="col-end-8">
        <button
          style={
            !props.data.isFinish
              ? !isOverdue
                ? { backgroundColor: "rgb(19 78 74)" }
                : { backgroundColor: "lightpink", borderColor: "lightpink" }
              : { backgroundColor: "turquoise", borderColor: "turquoise" }
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
