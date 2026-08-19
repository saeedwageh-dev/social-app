
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, LockKeyhole } from "lucide-react";
import axios from "axios";

function ChangePassword() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
const [errorMessage, setErrorMessage] = useState("");
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  }

  function validate() {
    const newErrors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (
      formData.currentPassword &&
      formData.newPassword &&
      formData.currentPassword === formData.newPassword
    ) {
      newErrors.newPassword =
        "New password must be different from your current password.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

async function handleSubmit(e) {
  e.preventDefault();

  if (!validate()) return;

  try {
    setIsLoading(true);
    setErrorMessage("");

    const response = await axios.patch(
      "https://route-posts.routemisr.com/users/change-password",
      {
        password: formData.currentPassword,
        newPassword: formData.newPassword,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    console.log(response.data);

    setIsSuccess(true);

    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  } catch (error) {
    const status = error.response?.status;

    if (status === 401) {
      setErrorMessage("Your current password is incorrect.");
    } else if (status === 400) {
      setErrorMessage(
        error.response?.data?.message ||
          "Please check your password information and try again."
      );
    } else if (!error.response) {
      setErrorMessage(
        "Unable to connect to the server. Please check your internet connection."
      );
    } else {
      setErrorMessage(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  } finally {
    setIsLoading(false);
  }
}

  return (
    <div className="min-h-screen bg-[#080a0f] px-4 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center justify-center">
        <div className="w-full rounded-2xl border border-white/6 bg-[#0d1016] p-6 sm:p-8">
          {isSuccess ? (
            <div className="py-5 text-center">
              {/* Success Icon */}
              <div
                className="
                  mx-auto
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-emerald-500/20
                  bg-emerald-500/10
                  text-emerald-400
                "
              >
                <CheckCircle2 size={30} strokeWidth={1.8} />
              </div>

              <h2 className="mt-5 text-xl font-semibold text-white">Password updated</h2>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-400">Your password has been changed successfully.</p>

              <Link
                to="/"
                className="
                  mt-7
                  inline-flex
                  items-center
                  gap-2
                  text-sm
                  font-medium
                  text-violet-400
                  transition
                  hover:text-violet-300
                "
              >
                <ArrowLeft size={17} />
                Back to Home
              </Link>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="mb-7">
                <div
                  className="
                    mb-5
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-violet-500/20
                    bg-violet-500/10
                    text-violet-400
                  "
                >
                  <LockKeyhole size={22} strokeWidth={1.8} />
                </div>

                <h1 className="text-xl font-semibold text-white">Change password</h1>

                <p className="mt-2 text-sm leading-6 text-slate-400">Update your password to keep your account secure.</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Current Password */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Current password</label>

                  <input
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    placeholder="Enter current password"
                    className={`
                      h-12
                      w-full
                      rounded-xl
                      border
                      bg-[#090c11]
                      px-4
                      text-sm
                      text-white
                      outline-none
                      transition
                      placeholder:text-slate-600
                      ${errors.currentPassword ? "border-red-500/60 focus:border-red-500" : "border-white/[0.07] focus:border-violet-500/50"}
                    `}
                  />

                  {errors.currentPassword && <p className="mt-2 text-xs text-red-400">{errors.currentPassword}</p>}
                </div>

                {/* New Password */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">New password</label>

                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="Enter new password"
                    className={`
                      h-12
                      w-full
                      rounded-xl
                      border
                      bg-[#090c11]
                      px-4
                      text-sm
                      text-white
                      outline-none
                      transition
                      placeholder:text-slate-600
                      ${errors.newPassword ? "border-red-500/60 focus:border-red-500" : "border-white/[0.07] focus:border-violet-500/50"}
                    `}
                  />

                  {errors.newPassword && <p className="mt-2 text-xs text-red-400">{errors.newPassword}</p>}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Confirm new password</label>

                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm new password"
                    className={`
                      h-12
                      w-full
                      rounded-xl
                      border
                      bg-[#090c11]
                      px-4
                      text-sm
                      text-white
                      outline-none
                      transition
                      placeholder:text-slate-600
                      ${errors.confirmPassword ? "border-red-500/60 focus:border-red-500" : "border-white/[0.07] focus:border-violet-500/50"}
                    `}
                  />

                  {errors.confirmPassword && <p className="mt-2 text-xs text-red-400">{errors.confirmPassword}</p>}
                </div>
{errorMessage && (
  <div className="mt-4 flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2.5 text-sm font-medium text-red-400">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.8}
      stroke="currentColor"
      className="h-4 w-4 shrink-0"
    >
      <circle cx="12" cy="12" r="9" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 8v4"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 16h.01"
      />
    </svg>

    <span>{errorMessage}</span>
  </div>
)}
                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="
                    mt-2
                    h-12
                    w-full
                    rounded-xl
                    bg-violet-500
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:bg-violet-400
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  {isLoading ? "Updating password..." : "Update password"}
                </button>

                {/* Back */}
                <Link
                  to="/"
                  className="
                    mx-auto
                    flex
                    w-fit
                    items-center
                    gap-2
                    pt-1
                    text-sm
                    text-slate-500
                    transition
                    hover:text-slate-300
                  "
                >
                  <ArrowLeft size={16} />
                  Back to Home
                </Link>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
