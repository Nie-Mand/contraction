import { useNavigate } from '@remix-run/react'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

interface IAuthContext {
  is: null | boolean
  user: any
  onLoggedIn: (user: any) => void
  onLoggedOut: () => void
}

const AuthContext = createContext<IAuthContext>({
  is: null,
  user: null,
  onLoggedIn: () => {},
  onLoggedOut: () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [is, setIs] = useState<null | boolean>(null)
  const [user, setUser] = useState(null)
  const push = useNavigate()

  const onLoggedIn = useCallback(
    (user: any) => {
      if (user.fullname && user.bio && user.avatar) {
        setIs(true)
        setUser(user)
        push('/~')
      } else {
        setIs(false)
      }
    },
    [push]
  )

  const onLoggedOut = useCallback(() => {
    setIs(false)
    setUser(null)
    push('/login')
  }, [push])

  return (
    <AuthContext.Provider value={{ is, user, onLoggedIn, onLoggedOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export const useRedirectIfNotLoggedIn = () => {
  const { is } = useAuth()
  const push = useNavigate()

  useEffect(() => {
    if (is === false) {
      push('/login')
    }
  }, [push, is])
}
