import { createStore, combineReducers } from "redux"
import todoReducer, { todoInitStateType } from "./TodoReducer"
import modalControllerReducer, { modalInitStateType } from "./ModalController"

export interface ApplicationState {
  todoReducer: todoInitStateType
  modalControllerReducer: modalInitStateType
}

const rootReducer = combineReducers({
  todoReducer,
  modalControllerReducer,
})

const store = createStore(rootReducer)

export type storeTypes = ReturnType<typeof rootReducer>

export default store
