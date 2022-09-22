import { NavLink } from '@remix-run/react'

export function Navbar() {
  return (
    <nav className="sticky top-0 bg-white py-3 border-b flex items-center space-x-4 ctr z-50">
      <NavLink to="/" className="font-extrabold">
        Contraction
      </NavLink>
      <div className="flex-1"></div>
      {/* <NavLink to="/login" className="text-sm">
        Login
      </NavLink>
      <NavLink to="/join" className="button text-sm">
        Join
      </NavLink> */}
      <button className="button text-sm">Logout</button>
    </nav>
  )
}
