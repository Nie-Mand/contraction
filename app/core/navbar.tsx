import { NavLink } from '@remix-run/react'

export function Navbar() {
  return (
    <nav className="py-3 border-b flex items-center space-x-4 container">
      <NavLink to="/" className="font-extrabold">
        Logo
      </NavLink>
      <div className="flex-1"></div>
      <NavLink to="/login" className="text-sm">
        Login
      </NavLink>
      <NavLink to="/join" className="button text-sm">
        Join
      </NavLink>
    </nav>
  )
}
