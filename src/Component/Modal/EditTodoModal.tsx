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

    console.log(cloneArr[index].infoFormat())

    dispatch({
      type: allAction.EDIT_ITEM,
      data: cloneArr[index],
    })

    closeModal()
  }
  const [deadlineDate, setDeadlineDate] = useState(cloneArr[index].deadLine)
  return (
    <div>
      <input type="checkbox" id="my-modal-2" className="modal-toggle" />
      <div className={["modal", "modal-open"].join(" ")}>
        <div className="modal-box">
          {"You are editing " + cloneArr[index].infoFormat() + ":"}
          <div
            style={{
              padding: "10px",
              borderRadius: "0.75em",
              backgroundColor: "rgb(250 250 250)",
              margin: "10px 0",
            }}>
            <input
              type="text"
              placeholder="Edit text here"
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

          <button
            className="mr-4"
            onClick={() => {
              onEdit(newItemName)
              // reset item name
              setNewItemName("")
            }}>
            <label htmlFor="my-modal-2" className="btn">
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
