

import { createContext, useContext } from "react";

export type TodoType={              // inside todo we use only these 4 property & type
    id:string;
    task:string;
    completed:boolean;
    createdAt:Date;
}

//^ Type define which type of data store in createContext and provider will pass that data as a value
export type TodoContextType={
    todosData:TodoType[];                   //which type of data store in Array so again define create typeAlias (TodoType) and assign here

    handleAddTodo:(task:string)=>void;  // here fun also define type is string and not return anything  //this called call signature

    toggleTodoAsCompleted:(id:string)=>void;       //call signature , here also fun not return

    handleDeleteTodo:(id:string)=>void;
}

//^ create context api
export const Context = createContext<TodoContextType|null>(null);




//^ Custom hook create for useContext hook as a consumer use
export const useContextTodo = () => {
  const TodoConsumer = useContext(Context);

  // if provider not wrap app.tsx / main.tsx so throw error
  if (!TodoConsumer) {
    throw new Error("useContextTodo must be used within a Provider");
  }
  
  return TodoConsumer;                               // now we get value which pass by provider in any .tsx component using useContextTodo()              
};