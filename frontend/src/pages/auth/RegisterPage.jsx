// Halaman register dengan struktur yang rapi
import { Link } from "react-router"
import { Helmet } from "react-helmet-async"
import FormField from "../../components/features/auth/FormField"
import Button from "../../components/ui/Button"
import { registerSchema } from "../../utils/schemas/auth.schema"
import { useAuthForm } from "../../hooks/useAuthForm"
import { registerUser } from "../../services/auth.api"

export default function RegisterPage() {
  // Gunakan custom hook untuk logic form
  const { register, handleSubmit, errors, loading, rootError } = useAuthForm(
    registerSchema,      // Schema validasi
    registerUser         // Service API
  )

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>

      {/* Layout langsung di page - tidak perlu komponen terpisah */}
      <div className="container min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md">
          {/* Header halaman */}
          <h1 className="text-titlepage font-bold mb-1">Daftar</h1>
          <p className="text-body-base mb-6">
            Bergabung dengan <span className='text-clr-primary'>CeritaKita</span>, dan bagikan Cerita anda
          </p>

          {/* Error umum dari server */}
          {rootError && (
            <div className="mb-4 p-3 bg-clr-warning text-clr-text-dark rounded-md text-body-small-base">
              {rootError}
            </div>
          )}

          {/* Form register */}
          <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
            {/* Gunakan FormField untuk setiap input */}
            <FormField
              id="name"
              label="Nama"
              placeholder="Nama Lengkap"
              register={register("name")}
              error={errors.name}
            />

            <FormField
              id="username"
              label="Username"
              placeholder="UserName"
              register={register("username")}
              error={errors.username}
            />

            <FormField
              id="email"
              type="email"
              label="Email"
              placeholder="example@example.com"
              register={register("email")}
              error={errors.email}
            />

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
              text="Register"
              className="w-min self-end"
            />

          </form>

          {/* Link ke halaman login */}
          <Link to="/login" className="text-clr-primary mt-6">
            Sudah Punya Akun?
          </Link>
        </div>
      </div>
    </>
  )
}