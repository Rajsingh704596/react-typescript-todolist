// create context Provider

import { ReactNode, useState } from "react"
import { Context, TodoType } from "./ContextApi"


//^ creating custom types using type declarations for children
export type TodoProviderPropType={
    children:ReactNode;           // ReactNode is a generic type that covers a wide range of possible children types, including JSX elements, strings, and other React Components. Represents all of the things React can render.
}

export const Provider=({children}:TodoProviderPropType)=>{        // children type is ReactNode

    // const[todosData,setTodosData]=useState<TodoType[]>([])         // here all todo data store and pass type(TodoType) which define in ContextApi.tsx file

    const[todosData,setTodosData]=useState<TodoType[]>(()=>{
      try {
        // local storage data get which name is TodoData
       const newTodos= localStorage.getItem("TodoData") || "[]";    // OR operator use so if data is not available in localstorage then empty array as an initial data use , for prevent error we wrap in string , so after parse method it's get original form
       return JSON.parse(newTodos) as TodoType[];     //  (data is string format so convert into object form using JSON.parse)
      } catch (error) {
        console.log(error);
        return []
      }
    })         // here all todo data store and pass type(TodoType) which define in ContextApi.tsx file

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
        
        //Local storage todo data set in string formate (so that when we refresh the site data will not remove)
        localStorage.setItem("TodoData",JSON.stringify(newTodos));         // here TodoData variable name pass where data store

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
      
         //Local storage todo data set in string formate (for update also)
        localStorage.setItem("TodoData",JSON.stringify(newTodos));

         return newTodos                   //fun not return anything just update setTodoData fun
      })
  }

  //Delete individual data
  const handleDeleteTodo=(id:string)=>{
      setTodosData((prev)=>{
        const newTodos = prev.filter((curTodo)=> curTodo.id !== id) ;   // so those id not match filter only that data

        //Local storage todo data set in string formate (for update also)
        localStorage.setItem("TodoData",JSON.stringify(newTodos));

        return newTodos;
      })
  }

    return (
      <Context.Provider value={{todosData, handleAddTodo, toggleTodoAsCompleted, handleDeleteTodo}}>
        {children}
      </Context.Provider>
    )

}