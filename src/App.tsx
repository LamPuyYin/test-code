import React from "react"
import { Provider } from "react-redux"
import store from "./Redux/reducers/rootReducer"
import { BrowserRouter } from "react-router-dom"
import "./App.css"
import RouterManager from "./RouterManager"
import ModalProvider from "./Provider/ModalProvider/ModalProvider"

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <ModalProvider />
          <RouterManager />
        </BrowserRouter>
      </div>
    </Provider>
  )
}

export default App
