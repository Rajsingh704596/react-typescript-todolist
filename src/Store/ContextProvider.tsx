// create context Provider

import { ReactNode, useState } from "react"
import { Context, TodoType } from "./ContextApi"


//^ creating custom types using type declarations for children
export type TodoProviderPropType={
    children:ReactNode;           // ReactNode is a generic type that covers a wide range of possible children types, including JSX elements, strings, and other React Components. Represents all of the things React can render.
}

export const Provider=({children}:TodoProviderPropType)=>{        // children type is ReactNode

    const[todosData,setTodosData]=useState<TodoType[]>([])         // here all todo data store and pass type(TodoType) which define in ContextApi.tsx file

   const handleAddTodo=(task:string)=>{           //task as a parameter get user input
       // update state fun
       setTodosData((prev)=>{

        //new variable define with type 
        const newTodos:TodoType[]=[          //array of an obj
            {
                 id:Math.random().toString(),
                 task: task,                    // user input store here
                 completed: false,              // by default value false
                 createdAt: new Date()          
            },
            ...prev                         // here previous data  , so new data always be top 
        ]
        // console.log(newTodos);
        return newTodos;                     // here this fun only update fun not return 
       })
   }
    
  // Toggle completed fun define (When checkbox click )
  const toggleTodoAsCompleted=(id:string)=>{
      setTodosData((prev)=>{
         const newTodos = prev.map((curTodo)=>{
                if(curTodo.id === id){
                    return {...curTodo, completed:!curTodo.completed}  //completed value is false to true
                }
               //    else
               return curTodo;
         })
         return newTodos                   //fun not return anything just update setTodoData fun
      })
  }

  //Delete individual data
  const handleDeleteTodo=(id:string)=>{
      setTodosData((prev)=>{
        const newTodos = prev.filter((curTodo)=> curTodo.id !== id) ;   // so those id not match filter only that data
        return newTodos;
      })
  }

    return (
      <Context.Provider value={{todosData, handleAddTodo, toggleTodoAsCompleted, handleDeleteTodo}}>
        {children}
      </Context.Provider>
    )

}