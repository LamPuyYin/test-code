import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { allAction } from "../../Redux/allAction"
import { ApplicationState } from "../../Redux/reducers/rootReducer"
import Todo from "../../Model/Todo"
import { CreateTodoModalDataType } from "../../Model/ModalDataType"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
library.add(fas)

import setHours from "date-fns/setHours"
import setMinutes from "date-fns/setMinutes"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { allTagNames } from "../../Model/allTagNames"

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
        data: new Todo(text, deadlineDate, tagName),
      })
    }
  }
  const [deadlineDate, setDeadlineDate] = useState(
    setHours(setMinutes(new Date(), 30), 16)
  )

  const [tagName, setTagName] = useState(allTagNames.GENERAL)

  return (
    <div>
      <input type="checkbox" id="my-modal-2" className="modal-toggle" />
      <div className={["modal", "modal-open"].join(" ")}>
        <div className="modal-box">
          <p className="mb-10 text-bold text-xl">
            {"Please set a deadline for " + ModalData?.valueOf() + ":"}
          </p>

          <div className="flex justify-center">
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
            className="mr-4 mt-6"
            onClick={() => {
              onCreate(createTextName)
              closeModal()
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
export default CreateTodoModal
