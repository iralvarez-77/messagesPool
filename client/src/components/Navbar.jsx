import {Link} from "react-router-dom"

function Navbar() {
  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounder-lg">
      <h1 className="text-2xl font-bold">Messages Manager</h1>
      <ul className="flex gap-x-2 ">
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">register</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar