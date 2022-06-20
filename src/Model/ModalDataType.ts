import DateFilterModal from "../Component/Modal/DateFilterModal"

export interface DeleteTodoModalDataType {
  removeID: string
}

export interface EditTodoModalDataType {
  editID: string
}

export interface CreateTodoModalDataType {
  createText: string
}

export interface DateFilterModalDataType {
  firstItemDate: Date
}
