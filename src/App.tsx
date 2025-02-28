
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import NavBar from './Components/NavBar'
import TodoData from './Components/TodoData'
import TodoForm from './Components/TodoForm'
import { Provider } from './Store/ContextProvider'

function App() {
 

  return (
    <>
    <BrowserRouter>
    <Provider>

      <h1> Todo List With React-TypeScript</h1>
      <hr />
      <NavBar/>
      <hr />
      <TodoForm/>
      <TodoData/>
                
    </Provider>
    </BrowserRouter>
    </>
  )
}

export default App
