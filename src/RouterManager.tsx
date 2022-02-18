import React from "react"
import { Route, Switch } from "react-router-dom"
import TodoList from "./Page/TodoListPage/TodoListPage"

const RouterManager = () => {
  return (
    <div>
      <Switch>
        <Route path={"/"}>
          <TodoList />
        </Route>
      </Switch>
    </div>
  )
}
export default RouterManager
