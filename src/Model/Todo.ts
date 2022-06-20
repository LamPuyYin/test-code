import { v4 as uuidv4 } from "uuid"
import { itemInfo } from "./ItemInfo"

class Todo implements itemInfo {
  id: string
  text: string
  isFinish: boolean
  deadLine: Date
  createDate: Date
  tag: string

  constructor(todoText: string, toDoDate: Date, todoTag: string) {
    this.text = todoText
    this.id = uuidv4()
    this.isFinish = false
    this.deadLine = toDoDate
    this.createDate = new Date()
    this.tag = todoTag
  }

  dateFormat() {
    const hh = String(this.deadLine.getHours()).padStart(2, "0")
    const mm = String(this.deadLine.getMinutes()).padStart(2, "0")
    return (
      "(deadline on: " +
      this.deadLine.toDateString() +
      ", " +
      hh +
      ":" +
      mm +
      ")"
    )
  }
  infoFormat() {
    return this.text + " as " + "(" + this.id + ")"
  }
}

export default Todo
