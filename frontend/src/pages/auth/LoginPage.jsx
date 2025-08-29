import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginUser } from "../../services/auth.api"
import Input from "../../components/Input"
import { Link, useNavigate } from "react-router"
import { Helmet } from "react-helmet-async"
import Button from "../../components/Button"
import { successToast } from "../../utils/alerts"

// 🔹 Zod Schema
const loginSchema = z.object({
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
})

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  })

  const onSubmit = async (data) => {
    setLoading(true)

    try {
      const res = await loginUser(data)

      if (res.status === "fail") {
        if (res.errors) {
          // 🔹 Jika ada error spesifik field dari backend
          Object.entries(res.errors).forEach(([field, message]) => {
            setError(field, { type: "server", message })
          })
        } else if (res.message) {
          // 🔹 Error umum
          setError("root", { type: "server", message: res.message })
        }
      } else if (res.status === "success") {
        successToast("Berhasil Login")
        navigate("/") // redirect ke home / dashboard
      }
    } catch (err) {
      console.error(err)
      setError("root", { type: "server", message: "Terjadi kesalahan server." })
    }

    setLoading(false)
  }

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <div className="container min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md">
          <h1 className="text-titlepage font-bold mb-1">Masuk</h1>
          <p className="text-body-base mb-6">
            Selamat datang kembali di <span className="text-clr-primary">CeritaKita</span>
          </p>

          {/* 🔹 Error umum dari server */}
          {errors.root && (
            <div className="mb-4 p-3 bg-clr-warning text-clr-text-dark rounded-md text-body-small-base">
              {errors.root.message}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
            {/* Email */}
            <div>
              <Input
                id="email"
                type="email"
                label="Email"
                text="example@example.com"
                showLabel
                {...register("email")}
              />
              {errors.email && (
                <p className="text-body-small-base text-clr-warning mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <Input
                id="password"
                type="password"
                label="Password"
                text="Password"
                showLabel
                {...register("password")}
              />
              {errors.password && (
                <p className="text-body-small-base text-clr-warning mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              disabled={loading}
              text={loading ? "Loading..." : "Login"}
              className={`w-min self-end ${loading ? "bg-clr-primary-active" : ""}`}
            />
          </form>

          <Link to="/register" className="text-clr-primary mt-6">Belum punya akun?</Link>
        </div>
      </div>
    </>
  )
}
