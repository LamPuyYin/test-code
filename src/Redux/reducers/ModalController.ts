import { allAction } from "../allAction"
import Modal from "../../Model/Modal"
import { Reducer } from "react"
import {
  DeleteTodoModalDataType,
  EditTodoModalDataType,
} from "../../Model/ModalDataType"

interface actionTypes {
  type: string
  Modal: Modal
  data: DeleteTodoModalDataType | EditTodoModalDataType | null
}

export interface modalInitStateType {
  Modal: Modal
  data: DeleteTodoModalDataType | EditTodoModalDataType | null
}

const initialState: modalInitStateType = {
  Modal: new Modal("", false),
  data: null,
}

const ModalController: Reducer<modalInitStateType, actionTypes> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case allAction.SET_MODAL:
      return {
        ...state,
        Modal: action.Modal,
        data: action.data,
      }
    case allAction.CLOSE_MODAL:
      return {
        ...state,
        Modal: new Modal("", false),
      }
    default:
      return state
  }
}

export default ModalController
