// src/context/AuthProvider.jsx
import { useEffect, useState, useCallback } from "react"
import { AuthContext } from "./AuthContext"
import { checkUser } from "@/services/auth.api"

/**
 * AuthProvider — membungkus seluruh aplikasi dengan context Auth.
 * Bertugas memeriksa JWT cookie, menyimpan data user ke state global,
 * dan menyediakan fungsi untuk memperbarui data user tanpa reload halaman.
 */
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  /**
   * 🔹 Fungsi untuk memverifikasi JWT & memperbarui data user.
   * Bisa dipanggil setelah login, register, atau logout.
   */
  const refreshUser = useCallback(async () => {
    try {
      const response = await checkUser()
      const data = response.data || response // tergantung format dari backend

      if (data.loggedIn) {
        setUser(data.user)
      } else {
        setUser(null)
      }
    } catch (err) {
      console.error("[Auth Check Error]:", err)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  // 🔹 Jalankan verifikasi pertama kali saat halaman dimuat
  useEffect(() => {
    refreshUser()
  }, [refreshUser])

  const value = {
    user,
    setUser,
    refreshUser, // 🔥 Tambahkan ke context
    loading,
    isAuthenticated: !!user,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
