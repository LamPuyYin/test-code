import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { allAction } from "../../Redux/allAction"

import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { FILTER_TYPE } from "../../Enum/FILTER_TYPE"

const DateFilterModal: React.FC = (props: any) => {
  const dispatch = useDispatch()

  const closeModal = (): void => {
    dispatch({ type: allAction.CLOSE_MODAL })
  }

  const [startDate, setStartDate] = useState(new Date())
  // if (ModalData === DateFilterModalDataType && ModalData !== null) {
  //   setStartDate(ModalData)
  // }
  const [endDate, setEndDate] = useState(new Date())

  const callDateFilter = (): void => {
    dispatch({
      type: allAction.FILTER_RANGE,
      // item id
      data: [startDate, endDate],
    })
    dispatch({
      type: allAction.FILTERING,
      data: FILTER_TYPE.DATE,
    })
    closeModal()
  }

  return (
    <div>
      <input type="checkbox" id="my-modal-2" className="modal-toggle " />
      <div className={["modal", "modal-open"].join(" ")}>
        <div className="modal-box w-screen">
          <p className="mb-10 text-bold text-xl">Please choose a date range:</p>
          <div className="flex justify-center">
            <DatePicker
              selected={startDate}
              onChange={(dates: [Date, Date]) => {
                const [start, end] = dates
                setStartDate(start)
                setEndDate(end)
              }}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              dateFormat="MMMM d, yyyy"
              className="btn btn-wide btn-lg "
              inline
            />
          </div>

          <button
            className="mr-4 mt-10"
            onClick={() => {
              // reset item name
              callDateFilter()
            }}>
            <label htmlFor="my-modal-2" className="btn px-10">
              Filter
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
export default DateFilterModal
