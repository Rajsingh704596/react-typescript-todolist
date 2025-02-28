import { FormEvent, useState } from "react"
import { useContextTodo } from "../Store/ContextApi";

const TodoForm = () => {

    const[todo,setTodo]=useState("");

    const{handleAddTodo}=useContextTodo();           //custom hook where useContext hook return

    const handleFormSubmit=(e:FormEvent<HTMLFormElement>)=>{       //e type is FormEvent<HTMLFormElement> must be used in form submit

      e.preventDefault();
      
      handleAddTodo(todo);          //fun. call and pass todo as a argument   // here this fun define in context store

      setTodo("")            //input field reset
    }

  return (
    <>
     <form onSubmit={handleFormSubmit}>
        <input type="text" value={todo} onChange={(e)=>setTodo(e.target.value)}/>

        <button type="submit">Add</button>
     </form>
      
    </>
  )
}

export default TodoForm
