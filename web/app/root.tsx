import type { MetaFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import styles from './styles/app.css'
import { Navbar } from '~/core/navbar'
import { Toaster } from 'react-hot-toast'
import { Provider } from '~/eth'
import { AuthProvider } from '~/services/auth'

export function links() {
  return [{ rel: 'stylesheet', href: styles }]
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
})

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen flex flex-col">
        <Provider>
          <AuthProvider>
            <Toaster position="bottom-right" />
            <Navbar />
            <Outlet />
          </AuthProvider>
        </Provider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

declare global {
  interface Window {
    ethereum: any
  }
}
