# React 19 + Vite + TypeScript Cheatsheet for Beginners

This cheatsheet is for beginners switching from JSX (plain React) to TSX (React with TypeScript) using React 19 and Vite. TypeScript adds type safety, making your code more reliable. Below, we’ll cover setup, key concepts, common TSX commands, and a To-Do List example to show where TypeScript shines—props, state, events, and more.

---

## 1. Setup React 19 with Vite and TypeScript
Run this command to create a new project:
```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm run dev
```
- `react-ts` template sets up React with TypeScript.
- Files use `.tsx` for components with JSX.

---

## 2. Basic Component (JSX to TSX)
**JSX Version:**
```jsx
function MyComponent() {
  return <h1>Hello</h1>;
}
```
**TSX Version:**
```tsx
import React from 'react';

const MyComponent: React.FC = () => {
  return <h1>Hello</h1>;
};

export default MyComponent;
```
- `React.FC` (Function Component) tells TypeScript this is a React component.
- Where TypeScript Helps: Ensures your component follows React rules.

---

## 3. Props (Where TypeScript Shines)
Define prop types with an interface. This is a key TypeScript benefit!
```tsx
interface MyProps {
  name: string;
  age: number;
}

const Greeting: React.FC<MyProps> = ({ name, age }) => {
  return <p>Hello, {name}! You are {age} years old.</p>;
};

export default Greeting;
```
- Usage: `<Greeting name="Bob" age={30} />`
- TypeScript Benefit: Catches errors if you pass wrong types (e.g., `age="30"`).

**Optional Props:**
```tsx
interface CardProps {
  title: string;
  description?: string; // Optional with ?
}

const Card: React.FC<CardProps> = ({ title, description }) => {
  return (
    <div>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
};
```

---

## 4. State with useState
TypeScript ensures your state has the correct type:
```tsx
import { useState } from 'react';

const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Add</button>
    </div>
  );
};
```
- `useState<number>` locks `count` to numbers.
- Where TypeScript Helps: Prevents bugs like `setCount("oops")`.

---

## 5. Event Handling (TypeScript in Action)
Events need types in TSX. Here’s how:
**Button Click:**
```tsx
const ButtonClick: React.FC = () => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Clicked!');
  };

  return <button onClick={handleClick}>Click Me</button>;
};
```
**Input Change:**
```tsx
const InputField: React.FC = () => {
  const [text, setText] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return <input value={text} onChange={handleChange} />;
};
```
- Where TypeScript Helps: Ensures `event.target.value` is a string and catches wrong event types.

**Form Submission:**
```tsx
const Form: React.FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form submitted');
  };

  return <form onSubmit={handleSubmit}><button>Submit</button></form>;
};
```

---

## 6. Lists with map()
Type your arrays for safe rendering:
```tsx
interface Item {
  id: number;
  name: string;
}

const ItemList: React.FC = () => {
  const items: Item[] = [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' },
  ];

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
};
```
- `Item[]` means an array of `Item` objects.
- Where TypeScript Helps: Ensures `item.name` exists and prevents typos.

---

## 7. Conditional Rendering
TypeScript keeps your logic safe:
```tsx
interface User {
  name: string | null;
}

const UserInfo: React.FC<User> = ({ name }) => {
  return <p>{name ?? 'No user'}</p>; // ?? handles null/undefined
};
```
- Where TypeScript Helps: Warns if `name` could be misused.

---

## 8. Hooks (useEffect Example)
TypeScript works with hooks too:
```tsx
import { useState, useEffect } from 'react';

const DataFetcher: React.FC = () => {
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    setData(['Item 1', 'Item 2']);
  }, []);

  return <ul>{data.map((item, i) => <li key={i}>{item}</li>)}</ul>;
};
```
- `string[]` ensures `data` is an array of strings.
- Where TypeScript Helps: Prevents wrong data types in hooks.

---

## 9. Default Props (Optional)
Set default values with TypeScript:
```tsx
interface BoxProps {
  color?: string;
}

const Box: React.FC<BoxProps> = ({ color = 'blue' }) => {
  return <div style={{ backgroundColor: color }}>Box</div>;
};
```

---

## 10. To-Do List Example (TSX in Practice)
Here’s a simple To-Do List showing where TypeScript is applied:
```tsx
import { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>('');

  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;
    setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    setInput('');
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div>
      <form onSubmit={addTodo}>
        <input
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
          placeholder="Add a task"
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map(todo => (
          <li
            key={todo.id}
            onClick={() => toggleTodo(todo.id)}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
```
- **Where TypeScript is Used:**
  - **Props:** Could add props like `initialTodos: Todo[]`.
  - **State:** `todos` is typed as `Todo[]`, `input` as `string`.
  - **Events:** `onSubmit` uses `React.FormEvent`, `onChange` uses `React.ChangeEvent`.
  - **Lists:** `todos.map` ensures each `todo` matches the `Todo` interface.

---

## 11. Common TypeScript Commands in TSX
Here’s an expanded table of commands/types commonly used in TSX:
| **Scenario**           | **Command/Type**                          | **Example**                          |
|-------------------------|------------------------------------------|--------------------------------------|
| Define Props           | `interface`                             | `interface Props { name: string; }`  |
| Type State             | `<type>` in `useState`                  | `useState<number>(0)`               |
| Event Type (Click)     | `React.MouseEvent<HTMLElement>`         | `(e: React.MouseEvent<HTMLButtonElement>)` |
| Event Type (Input)     | `React.ChangeEvent<HTMLInputElement>`   | `(e: React.ChangeEvent<HTMLInputElement>)` |
| Event Type (Form)      | `React.FormEvent<HTMLFormElement>`      | `(e: React.FormEvent<HTMLFormElement>)` |
| Optional Prop          | `?`                                     | `age?: number`                      |
| Array Type             | `type[]`                                | `string[]`                          |
| Union Type             | `\|`                                    | `string \| null`                    |
| Function Type          | `(param: type) => returnType`           | `(id: number) => void`              |
| Object Type            | `{ key: type; }`                        | `{ id: number; name: string; }`     |
| Readonly Prop          | `readonly`                              | `readonly id: number`               |
| Type Assertion         | `as`                                    | `const value = event.target as HTMLInputElement` |
| Non-null Assertion     | `!`                                     | `myRef.current!.focus()`            |
| Generic Type           | `<T>`                                   | `useState<Todo[]>([])`              |

---

## 12. Where TypeScript is Mostly Used in React
- **Props:** Ensures components get the right data (e.g., `<Greeting name="Bob" age={30} />`).
- **State:** Prevents invalid state updates (e.g., `setCount("oops")` fails).
- **Events:** Guarantees correct event handling (e.g., `event.target.value` is a string).
- **API Calls:** Types responses (e.g., `{ id: number; title: string }` from fetch).
- **Lists:** Ensures array items match expected shape (e.g., `todos.map` with `Todo`).
- **Refs:** Types DOM elements (e.g., `React.useRef<HTMLInputElement>(null)`).
- **Hooks:** Ensures hook arguments/returns are typed (e.g., `useEffect` dependencies).
- **Context:** Types shared state (e.g., `React.createContext<MyContextType>`).

---

## 13. Switching from JSX to TSX: Quick Tips
- Rename `.jsx` to `.tsx`.
- Add types to props, state, and events.
- Use `React.FC` for components (optional but beginner-friendly).
- Run `npm run dev` and fix TypeScript errors as they appear—they’re your friends!

---

Start small, practice these examples (especially the To-Do List), and enjoy the power of TypeScript in React 19 with Vite!
```

---

### Key Additions:
1. **More Common Commands:** Added `readonly`, `type assertion (as)`, `non-null assertion (!)`, `function type`, `generic type (<T>)`, etc., to the table in Section 11.
2. **To-Do List Example:** Included in Section 10 to show TypeScript in action with state, events, and lists—a practical, relatable use case for beginners.
3. **Expanded "Where TypeScript is Used":** Added refs, hooks, and context to Section 12 for a broader understanding of TypeScript’s role in React.

This version remains simple and beginner-friendly while providing more depth. Let me know if you’d like further tweaks or additional examples!
