import { NavLink } from '@remix-run/react'
import { useWallet } from '~/eth'
import { useLogout } from '~/services/users'
import { useAuth } from '~/services/auth'

export function Navbar() {
  const logout = useLogout()
  const { is } = useAuth()

  return (
    <nav className="sticky top-0 bg-white py-3 border-b flex items-center space-x-4 ctr z-50">
      <NavLink to="/" className="font-extrabold">
        Contraction
      </NavLink>
      <div className="flex-1"></div>
      {is ? (
        <button className="button text-sm" onClick={logout}>
          Logout
        </button>
      ) : (
        <>
          <NavLink to="/login" className="text-sm">
            Login
          </NavLink>
          <NavLink to="/join" className="button text-sm">
            Join
          </NavLink>
        </>
      )}
      {/*  */}
    </nav>
  )
}
