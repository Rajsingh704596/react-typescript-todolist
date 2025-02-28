import { Link } from "react-router-dom"

const NavBar = () => {

  return (
    <>
    <nav>
    <Link to="/">All List</Link>
    <Link to="/?todos=active">Active List</Link>            {/*the query string start with ? and contains two key-value pairs */}
    <Link to="/?todos=completed">Completed List</Link>
    </nav> 
    </>
  )
}

export default NavBar
