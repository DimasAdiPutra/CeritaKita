// src/components/features/auth/FormField.jsx
import PropTypes from "prop-types"
import { useState } from "react"
import { FiEye, FiEyeOff } from "react-icons/fi"
import Input from "../../ui/Input"

export default function FormField({
  id,
  label,
  placeholder,
  type = "text",
  register,
  error,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false)

  // Kalau type password → toggleable, kalau bukan biarkan default
  const inputType = type === "password" && showPassword ? "text" : type

  return (
    <div className="flex flex-col gap-1">
      <Input
        id={id}
        type={inputType}
        label={label}
        text={placeholder}
        showLabel
        {...register}
        {...props}
        // 🔹 Tambahkan icon toggle password jika type=password
        iconRight={
          type === "password" ? (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Sembunyikan password" : "Lihat password"}
              className="text-clr-text-light hover:text-clr-primary cursor-pointer"
              tabIndex={-1} // biar gak bentrok dengan tab order form
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          ) : null
        }
      />

      {/* Error message */}
      {error && (
        <p
          id={`${id}-error`}
          className="text-body-small-base text-clr-warning"
          role="alert"
        >
          {error.message}
        </p>
      )}
    </div>
  )
}

FormField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  register: PropTypes.object.isRequired,
  error: PropTypes.object,
}
