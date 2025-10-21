import { createContext } from "react"

/**
 * Context global untuk menyimpan informasi user login.
 * Tidak digunakan langsung — akses pakai useAuth() di file terpisah.
 */
export const AuthContext = createContext({
  user: null,
  setUser: () => { },
  loading: true,
  isAuthenticated: false,
})
