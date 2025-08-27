import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerUser } from "../../services/auth.api"
import Input from "../../components/Input"
import { Link, useNavigate } from "react-router"
import { Helmet } from "react-helmet-async"
import Button from "../../components/Button"

// 🔹 Zod Schema
const registerSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  username: z.string().min(3, "Username minimal 3 karakter"),
  email: z.templateLiteral([
    z.string().min(2),
    "@",
    z.string().max(64),
  ], 'Format email tidak valid'),
  password: z.string().min(6, "Password minimal 6 karakter"),
})

export default function RegisterPage() {
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError, // <--- dipakai untuk inject error dari backend
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange", // Realtime validation
  })

  const onSubmit = async (data) => {
    setLoading(true)

    try {
      const res = await registerUser(data)

      if (res.status === "fail") {
        if (res.errors) {
          // 🔹 Jika backend mengirim error field spesifik
          Object.entries(res.errors).forEach(([field, message]) => {
            setError(field, { type: "server", message }) // taruh inline error
          })
        } else if (res.message) {
          // 🔹 Jika error umum, tampilkan di password misalnya
          setError("root", { type: "server", message: res.message })
        }
      } else if (res.status === "success") {
        navigate('/')
        // redirect ke login page
      }
    } catch (err) {
      console.log(err)
      setError("root", { type: "server", message: "Terjadi kesalahan server." })
    }

    setLoading(false) // pastikan tombol kembali normal
  }

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>

      <div className="container min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md">
          <h1 className="text-titlepage font-bold mb-1">Daftar</h1>
          <p className="text-body-base mb-6">Bergabung dengan <span className='text-clr-primary'>CeritaKita</span>, dan bagikan Cerita anda</p>

          {/* 🔹 Error umum dari server */}
          {errors.root && (
            <div className="mb-4 p-3 bg-clr-warning text-clr-text-dark rounded-md text-body-small-base">
              {errors.root.message}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
            {/* Name */}
            <div>
              <Input id="name" label="Nama" text="Nama Lengkap" showLabel {...register("name")} />
              {errors.name && (
                <p className="text-body-small-base text-clr-warning mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Username */}
            <div>
              <Input id="username" label="Username" text="UserName" showLabel {...register("username")} />
              {errors.username && (
                <p className="text-body-small-base text-clr-warning mt-1">{errors.username.message}</p>
              )}
            </div>

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
              text={loading ? "Loading..." : "Daftar"}
              className={`w-min self-end ${loading ? 'bg-clr-primary-active' : ''}`}
            />
          </form>

          <Link to="/login" className="text-clr-primary mt-6">Sudah Punya Akun?</Link>
        </div>
      </div>
    </>
  )
}
