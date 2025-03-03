import { useSearchParams } from "react-router-dom";
import { useContextTodo } from "../Store/ContextApi"

const TodoData = () => {
    const{todosData,toggleTodoAsCompleted, handleDeleteTodo}=useContextTodo();

    const[searchParams] = useSearchParams();             // useSearchParams hook used to get search data from Link url

    const todoParamData = searchParams.get("todos");
    console.log("react router dom link search parameter get data",todoParamData);   //all or active or complete which link we click that define todoParamDataa

    let filterData = todosData;          // so we get active data and complete data separately

    //conditional statement for nav bar req.
    if(todoParamData === "active"){
        filterData = filterData.filter((task)=> !task.completed)  // return data which is not completed
    }

    if(todoParamData === "completed"){
        filterData = filterData.filter((task)=> task.completed)    //filter data which is completed
    }

  return (
    <div className="data">
        {
            filterData.map((curTodo)=>{
                return <li key={curTodo.id}>
                    <input type="checkbox" id={curTodo.id} checked={curTodo.completed} onChange={()=>{toggleTodoAsCompleted(curTodo.id)}}/>
                    <label htmlFor={curTodo.id} className={curTodo.completed?"strike":"notStrike"}>{curTodo.task}</label>

                    {curTodo.completed && (
                        <button type="button" onClick={()=>handleDeleteTodo(curTodo.id)}>Delete</button>
                    )}
                </li>
            })
        }
      
    </div>
  )
}

export default TodoData
