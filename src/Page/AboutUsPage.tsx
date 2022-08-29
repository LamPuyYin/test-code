import React, { useState } from "react"
import { Link, useHistory, withRouter } from "react-router-dom"

const TodoListPage: React.FC = () => {
  const names = ["Ada Lovelace", "Grace Hopper", "Margaret Hamilton"]

  const [likes, setLikes] = useState(0)
  const history = useHistory()

  function backHomePage() {
    history.push("/")
  }
  function handleClick() {
    setLikes(likes + 1)
  }

  return (
    <div className="bg-cyan-600	h-128 max-h-full p-8 mx-80 mt-10 card bordered shadow-sm">
      <div>
        <h1>Develop. Preview. SHIPPP. 🚀</h1>
        <div className="w-full justify-center my-3 btn btn-primary">
          HELLO everyone
        </div>
        <ul>
          {names.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>

        <button onClick={handleClick}>Like ({likes})</button>

        <div className="card">
          <button className="btn" onClick={backHomePage}>
            Go back
          </button>
        </div>
      </div>
    </div>
  )
}

export default withRouter(TodoListPage)
