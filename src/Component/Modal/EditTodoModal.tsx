import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { allAction } from "../../Redux/allAction"
import { ApplicationState } from "../../Redux/reducers/rootReducer"
import Todo from "../../Model/Todo"
import { EditTodoModalDataType } from "../../Model/ModalDataType"

import DatePicker from "react-datepicker"
import setHours from "date-fns/setHours"
import setMinutes from "date-fns/setMinutes"
import "react-datepicker/dist/react-datepicker.css"
import { allTagNames } from "../../Model/allTagNames"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
library.add(fas)

const EditTodoModal: React.FC = (props: any) => {
  const dispatch = useDispatch()

  const [newItemName, setNewItemName] = useState<string>("")

  const ModalData = useSelector((state: ApplicationState) => {
    return state.modalControllerReducer.data
  })

  const closeModal = (): void => {
    dispatch({ type: allAction.CLOSE_MODAL })
  }
  const todos = useSelector((state: ApplicationState) => {
    return state.todoReducer.allTodo
  })

  let index = -1
  index = todos.findIndex((e) => e.id === ModalData?.valueOf())

  const cloneArr: Todo[] = [...todos]

  const onEdit = (text: string): void => {
    console.log(ModalData)
    cloneArr[index].text = text
    cloneArr[index].deadLine = deadlineDate
    cloneArr[index].tag = tagName

    console.log(cloneArr[index].infoFormat())

    dispatch({
      type: allAction.EDIT_ITEM,
      data: cloneArr[index],
    })

    closeModal()
  }
  const [deadlineDate, setDeadlineDate] = useState(cloneArr[index].deadLine)
  const [tagName, setTagName] = useState(cloneArr[index].tag)

  return (
    <div>
      <input type="checkbox" id="my-modal-2" className="modal-toggle" />
      <div className={["modal", "modal-open"].join(" ")}>
        <div className="modal-box w-screen">
          <p className="text-bold truncate ">
            {"You are editing " + cloneArr[index].text + ":"}
          </p>
          <p className="text-bold">{cloneArr[index].dateFormat()}</p>

          <div
            style={{
              padding: "5px",
              borderRadius: "0.75em",
              backgroundColor: "rgb(250 250 250)",
              margin: "10px 0",
            }}>
            <input
              type="text"
              placeholder="Edit text here"
              className="w-full input input-ghost input-group-lg"
              style={{
                padding: "10px",
                borderRadius: "0.75em",
                backgroundColor: "rgb(250 250 250)",
                margin: "4px 0",
              }}
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
            />
          </div>

          <div className="flex justify-center mt-2">
            <DatePicker
              selected={deadlineDate}
              onChange={(date: Date) => {
                setDeadlineDate(date)
              }}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
              className="btn btn-wide btn-lg p-6 "
              inline
            />
          </div>

          <div className="mx-4 mt-5 flex gap-2 justify-center">
            <button
              className={
                "btn btn-primary btn-xs btn-outline" +
                (tagName === allTagNames.GENERAL ? "btn-info" : "")
              }
              onClick={() => {
                setTagName(allTagNames.GENERAL)
                console.log("changed tagName", tagName)
              }}>
              <FontAwesomeIcon
                icon={{ prefix: "fas", iconName: "coffee" }}
                className="mx-1 stroke-current"
              />
              {allTagNames.GENERAL}
            </button>
            <button
              className={
                "btn btn-primary btn-xs btn-outline" +
                (tagName === allTagNames.HOME ? "btn-info" : "")
              }
              onClick={() => {
                setTagName(allTagNames.HOME)
                console.log("changed tagName", tagName)
              }}>
              <FontAwesomeIcon
                icon={{ prefix: "fas", iconName: "house" }}
                className="mx-1 stroke-current"
              />
              {allTagNames.HOME}
            </button>
            <button
              className={
                "btn btn-primary btn-xs btn-outline" +
                (tagName === allTagNames.OFFICE ? "btn-info" : "")
              }
              onClick={() => {
                setTagName(allTagNames.OFFICE)
                console.log("changed tagName", tagName)
              }}>
              <FontAwesomeIcon
                icon={{ prefix: "fas", iconName: "buildings" }}
                className="mx-1 stroke-current"
              />
              {allTagNames.OFFICE}
            </button>
            <button
              className={
                "btn btn-primary btn-xs btn-outline" +
                (tagName === allTagNames.SCHOOL ? "btn-info" : "")
              }
              onClick={() => {
                setTagName(allTagNames.SCHOOL)
                console.log("changed tagName", tagName)
              }}>
              <FontAwesomeIcon
                icon={{ prefix: "fas", iconName: "graduation-cap" }}
                className="mx-1 stroke-current"
              />
              {allTagNames.SCHOOL}
            </button>
            <button
              className={
                "btn btn-primary btn-xs btn-outline" +
                (tagName === allTagNames.IMPORTANT ? "btn-info" : "")
              }
              onClick={() => {
                setTagName(allTagNames.IMPORTANT)
                console.log("changed tagName", tagName)
              }}>
              <FontAwesomeIcon
                icon={{ prefix: "fas", iconName: "warning" }}
                className="mx-1 stroke-current"
              />
              {allTagNames.IMPORTANT}
            </button>
          </div>

          <button
            className="mr-4 mt-4"
            onClick={() => {
              onEdit(newItemName)
              // reset item name
              setNewItemName("")
            }}>
            <label htmlFor="my-modal-2" className="btn px-10">
              Submit
            </label>
          </button>
          <button onClick={() => closeModal()}>
            <label htmlFor="my-modal-2" className="btn btn-ghost">
              Close
            </label>
          </button>
        </div>
      </div>
    </div>
  )
}
export default EditTodoModal
