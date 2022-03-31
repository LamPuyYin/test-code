import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { allAction } from "../../Redux/allAction"
import { ApplicationState } from "../../Redux/reducers/rootReducer"
import Todo from "../../Model/Todo"
import { CreateTodoModalDataType } from "../../Model/ModalDataType"

import setHours from "date-fns/setHours"
import setMinutes from "date-fns/setMinutes"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const CreateTodoModal: React.FC = (props: any) => {
  const dispatch = useDispatch()

  const ModalData = useSelector((state: ApplicationState) => {
    return state.modalControllerReducer.data
  })
  const createTextName = ModalData?.toString()

  const closeModal = (): void => {
    dispatch({ type: allAction.CLOSE_MODAL })
  }

  const onCreate = (text: string | undefined): void => {
    console.log(text, deadlineDate.toLocaleString())
    if (text !== undefined) {
      dispatch({
        type: allAction.ADD_ITEM,
        data: new Todo(text, deadlineDate),
      })
    }
  }
  const [deadlineDate, setDeadlineDate] = useState(
    setHours(setMinutes(new Date(), 30), 16)
  )

  return (
    <div>
      <input type="checkbox" id="my-modal-2" className="modal-toggle" />
      <div className={["modal", "modal-open"].join(" ")}>
        <div className="modal-box">
          <p className="mb-6">
            {"Please set a deadline for " + ModalData?.valueOf() + ":"}
          </p>

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
            className="mr-4 mt-6"
            onClick={() => {
              onCreate(createTextName)
              closeModal()
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
export default CreateTodoModal
