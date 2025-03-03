import { Link, useSearchParams } from "react-router-dom"

const NavBar = () => {

  const[searchParams]=useSearchParams();
  const todoSearchLink = searchParams.get("todos")

  return (
    <>
    <nav>
    <Link to="/" className={todoSearchLink===null?"active":"nav"}>All List</Link>
    <Link to="/?todos=active" className={todoSearchLink==="active"?"active":"nav"}>Active List</Link>            {/*the query string start with ? and contains two key-value pairs */}
    <Link to="/?todos=completed" className={todoSearchLink==="completed"?"active":"nav"}>Completed List</Link>
    </nav> 
    </>
  )
}

export default NavBar
