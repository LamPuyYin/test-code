import React from "react"
import { Route, Switch } from "react-router-dom"
import TodoList from "./Page/TodoListPage"
import AboutUsPage from "./Page/AboutUsPage"

const RouterManager = () => {
  return (
    <div>
      <Switch>
        {}
        <Route /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
          // @ts-ignore
          exact
          path="/">
          <TodoList />
        </Route>
        <Route /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
          // @ts-ignore
          exact
          path="/about">
          <AboutUsPage />
        </Route>
      </Switch>
    </div>
  )
}
export default RouterManager
