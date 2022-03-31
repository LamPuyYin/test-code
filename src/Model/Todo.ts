import { v4 as uuidv4 } from "uuid"
import { itemInfo } from "./ItemInfo"

class Todo implements itemInfo {
  id: string
  text: string
  isFinish: boolean
  deadLine: Date
  createDate: Date

  constructor(todoText: string, toDoDate: Date) {
    this.text = todoText
    this.id = uuidv4()
    this.isFinish = false
    this.deadLine = toDoDate
    this.createDate = new Date()
  }

  infoFormat() {
    return this.text + " as " + "(" + this.id + ")"
  }
}

export default Todo
