// src/pages/auth/LoginPage.jsx
import { Link } from "react-router"
import { Helmet } from "react-helmet-async"
import FormField from "../../components/features/auth/FormField"
import Button from "../../components/ui/Button"
import { useAuthForm } from "../../hooks/useAuthForm"
import { loginUser } from "../../services/auth.api"
import { loginSchema } from "../../utils/schemas/auth.schema"

export default function LoginPage() {
  // 🔹 Gunakan custom hook agar konsisten dengan RegisterPage
  const { register, handleSubmit, errors, loading, rootError } = useAuthForm(
    loginSchema,
    loginUser
  )

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
          {rootError && (
            <div className="mb-4 p-3 bg-clr-warning text-clr-text-dark rounded-md text-body-small-base">
              {rootError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
            {/* Email */}
            <FormField
              id="email"
              type="email"
              label="Email"
              placeholder="example@example.com"
              register={register("email")}
              error={errors.email}
            />

            {/* Password */}
            <FormField
              id="password"
              type="password"
              label="Password"
              placeholder="Password"
              register={register("password")}
              error={errors.password}
            />

            {/* Tombol submit */}
            <Button
              type="submit"
              isLoading={loading}
              disabled={loading}
              text="Login"
              className="w-min self-end"
            />

          </form>

          <Link to="/register" className="text-clr-primary mt-6">
            Belum punya akun?
          </Link>
        </div>
      </div>
    </>
  )
}
