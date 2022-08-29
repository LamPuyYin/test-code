import React from "react"
import { useSelector } from "react-redux"
import { Link, useHistory, withRouter } from "react-router-dom"
import TodoList from "../Component/TodoList/TodoList"

import { ApplicationState } from "../Redux/reducers/rootReducer"

const TodoListPage: React.FC = (props) => {
  const todos = useSelector((state: ApplicationState) => {
    return state.todoReducer.allTodo
  })

  const history = useHistory()

  function handleClick() {
    history.push("/about")
  }

  if (Array.isArray(todos)) {
    return (
      <div className="bg-cyan-600	h-128 max-h-full p-8 mx-80 mt-10 card bordered shadow-sm">
        <TodoList items={todos} />

        <button className="btn" onClick={handleClick}>
          About us
        </button>
      </div>
    )
  }
  return <div>loading...</div>
}

export default withRouter(TodoListPage)
