import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { allAction } from "../../Redux/allAction"
import { ApplicationState } from "../../Redux/reducers/rootReducer"
import Todo from "../../Model/Todo"
import { EditTodoModalDataType } from "../../Model/ModalDataType"

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

  const onEdit = (text: string): void => {
    console.log(ModalData?.valueOf())
    let index = -1
    index = todos.findIndex((e) => e.id === ModalData?.valueOf())

    const cloneArr: Todo[] = [...todos]
    cloneArr[index].text = text

    dispatch({
      type: allAction.EDIT_ITEM,
      data: cloneArr[index],
    })

    closeModal()
  }

  return (
    <div>
      <input type="checkbox" id="my-modal-2" className="modal-toggle" />
      <div className={["modal", "modal-open"].join(" ")}>
        <div className="modal-box">
          {"You are editing " + ModalData + ":"}
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
            <label htmlFor="my-modal-2" className="btn">
              Close
            </label>
          </button>
        </div>
      </div>
    </div>
  )
}
export default EditTodoModal
