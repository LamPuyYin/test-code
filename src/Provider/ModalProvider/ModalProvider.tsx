import React from "react"
import DeleteTodoModal from "../../Component/Modal/DeleteTodoModal"
import { useSelector } from "react-redux"
import { ApplicationState } from "../../Redux/reducers/rootReducer"
import { MODAL_TYPE } from "../../Enum/MODAL_TYPE"
import EditTodoModal from "../../Component/Modal/EditTodoModal"
import CreateTodoModal from "../../Component/Modal/CreateTodoModal"
import DateFilterModal from "../../Component/Modal/DateFilterModal"

const ModalProvider: React.FC = (props: any) => {
  const isOpen = useSelector(
    (state: ApplicationState) => state.modalControllerReducer.Modal.isOpen
  )

  const modalName = useSelector(
    (state: ApplicationState) => state.modalControllerReducer.Modal.name
  )

  if (isOpen && modalName === MODAL_TYPE.DELETE_TODO)
    return (
      <>
        <DeleteTodoModal />
      </>
    )
  else if (isOpen && modalName === MODAL_TYPE.EDIT_TODO)
    return (
      <>
        <EditTodoModal />
      </>
    )
  else if (isOpen && modalName === MODAL_TYPE.CREATE_TODO)
    return (
      <>
        <CreateTodoModal />
      </>
    )
  else if (isOpen && modalName === MODAL_TYPE.DATE_FILTER)
    return (
      <>
        <DateFilterModal />
      </>
    )
  return <div />
}
export default ModalProvider
