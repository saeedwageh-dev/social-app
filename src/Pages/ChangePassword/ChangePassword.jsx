// import { useContext, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { useMutation } from "@tanstack/react-query";
// import {
//   ArrowLeft,
//   Eye,
//   EyeOff,
//   LockKeyhole,
//   ShieldCheck,
//   AlertCircle,
//   CheckCircle2,
//   Loader2,
// } from "lucide-react";

// import { AuthContext } from "../../Context/AuthContext";

// // =====================================================
// // API
// // =====================================================

// const CHANGE_PASSWORD_URL =
//   "https://route-posts.routemisr.com/users/change-password";


// const PASSWORD_REGEX =
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


// const initialForm = {
//   currentPassword: "",
//   newPassword: "",
//   confirmPassword: "",
// };


// function PasswordInput({
//   id,
//   label,
//   value,
//   onChange,
//   placeholder,
//   showPassword,
//   onTogglePassword,
//   error,
//   touched,
//   disabled,
// }) {
//   const hasError = touched && error;

//   return (
//     <div className="space-y-2.5">
//       <label
//         htmlFor={id}
//         className="mb-2 block text-[13px] font-medium text-slate-200"
//       >
//         {label}
//       </label>

//       <div className="relative">
//         {/* Left Icon */}
//         <LockKeyhole
//           size={20}
//           strokeWidth={1.8}
//           className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
//         />

//         <input
//           id={id}
//           name={id}
//           type={showPassword ? "text" : "password"}
//           value={value}
//           onChange={onChange}
//           placeholder={placeholder}
//           disabled={disabled}
//           autoComplete="new-password"
//           aria-invalid={Boolean(hasError)}
//           aria-describedby={hasError ? `${id}-error` : undefined}
//           className={`
//             h-12.5
//             w-full
//             rounded-xl
//             border
//             bg-[#0d1016]
//             pl-12
//             pr-12
//             text-sm
//             text-white
//             outline-none
//             placeholder:text-slate-500
//             transition-all
//             duration-200

//             ${
//               hasError
//                 ? `
//                   border-red-500/70
//                   focus:border-red-500
//                   focus:ring-4
//                   focus:ring-red-500/10
//                 `
//                 : `
//                   border-slate-800
//                   hover:border-slate-700
//                   focus:border-violet-500/70
//                   focus:ring-4
//                   focus:ring-violet-500/10
//                 `
//             }

//             disabled:cursor-not-allowed
//             disabled:opacity-60
//           `}
//         />

//         {/* Password Visibility */}
//         <button
//           type="button"
//           onClick={onTogglePassword}
//           disabled={disabled}
//           aria-label={showPassword ? "Hide password" : "Show password"}
//           className="
//             absolute
//             right-4
//             top-1/2
//             flex
//             -translate-y-1/2
//             items-center
//             justify-center
//             rounded-lg
//             p-1
//             text-slate-400
//             transition
//             hover:text-slate-200
//             disabled:cursor-not-allowed
//           "
//         >
//           {showPassword ? (
//             <EyeOff size={20} strokeWidth={1.8} />
//           ) : (
//             <Eye size={20} strokeWidth={1.8} />
//           )}
//         </button>
//       </div>

//       {hasError && (
//         <p
//           id={`${id}-error`}
//           className="flex items-center gap-1.5 text-xs font-medium text-red-400"
//         >
//           <AlertCircle size={14} />
//           {error}
//         </p>
//       )}
//     </div>
//   );
// }

// // =====================================================
// // Main Component
// // =====================================================

// function ChangePassword() {
//   const { userToken } = useContext(AuthContext);

//   const [form, setForm] = useState(initialForm);

//   const [touched, setTouched] = useState({});
//   const [submitAttempted, setSubmitAttempted] = useState(false);

//   const [showPassword, setShowPassword] = useState({
//     current: false,
//     new: false,
//     confirm: false,
//   });

//   // ===================================================
//   // Validation
//   // ===================================================

//   function validate(values = form) {
//     const errors = {};

//     if (!values.currentPassword.trim()) {
//       errors.currentPassword = "Current password is required.";
//     }

//     if (!values.newPassword) {
//       errors.newPassword = "New password is required.";
//     } else if (!PASSWORD_REGEX.test(values.newPassword)) {
//       errors.newPassword =
//         "Password must be at least 8 characters and include uppercase, lowercase, number and special character.";
//     }

//     if (!values.confirmPassword) {
//       errors.confirmPassword = "Please confirm your new password.";
//     } else if (values.confirmPassword !== values.newPassword) {
//       errors.confirmPassword = "Passwords do not match.";
//     }

//     // Optional client-side rule.
//     // Keep this only if your backend follows the same rule.
//     if (
//       values.currentPassword &&
//       values.newPassword &&
//       values.currentPassword === values.newPassword
//     ) {
//       errors.newPassword =
//         "New password must be different from your current password.";
//     }

//     return errors;
//   }

//   const errors = validate();

//   // ===================================================
//   // API Mutation
//   // ===================================================

//   const changePasswordMutation = useMutation({
//     mutationFn: async (passwordData) => {
//       const response = await axios.patch(
//         CHANGE_PASSWORD_URL,
//         passwordData,
//         {
//           headers: {
//             Authorization: `Bearer ${userToken}`,
//           },
//         }
//       );

//       return response.data;
//     },

//     onSuccess: () => {
//       setForm(initialForm);
//       setTouched({});
//       setSubmitAttempted(false);
//     },
//   });

//   // ===================================================
//   // Handlers
//   // ===================================================

//   function handleChange(e) {
//     const { name, value } = e.target;

//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     // If user has already interacted with the field,
//     // validation updates immediately.
//     setTouched((prev) => ({
//       ...prev,
//       [name]: true,
//     }));
//   }

//   function handleBlur(e) {
//     const { name } = e.target;

//     setTouched((prev) => ({
//       ...prev,
//       [name]: true,
//     }));
//   }

//   function togglePassword(field) {
//     setShowPassword((prev) => ({
//       ...prev,
//       [field]: !prev[field],
//     }));
//   }

//   function handleSubmit(e) {
//     e.preventDefault();

//     setSubmitAttempted(true);

//     const validationErrors = validate(form);

//     if (Object.keys(validationErrors).length > 0) {
//       setTouched({
//         currentPassword: true,
//         newPassword: true,
//         confirmPassword: true,
//       });

//       return;
//     }

//     // =================================================
//     // IMPORTANT:
//     // Change these property names if your backend
//     // expects different names.
//     // =================================================

//     changePasswordMutation.mutate({
//       password: form.currentPassword,
//       newPassword: form.newPassword,
//     });
//   }

//   // ===================================================
//   // API Error Message
//   // ===================================================

//   function getApiErrorMessage() {
//     const error = changePasswordMutation.error;

//     if (!error) return "";

//     const status = error.response?.status;

//     if (status === 401) {
//       return "Your current password is incorrect.";
//     }

//     if (status === 400) {
//       return (
//         error.response?.data?.message ||
//         "Please check your password information and try again."
//       );
//     }

//     if (!error.response) {
//       return "Unable to connect to the server. Please check your internet connection.";
//     }

//     return (
//       error.response?.data?.message ||
//       "Something went wrong. Please try again."
//     );
//   }

//   const isSubmitting = changePasswordMutation.isPending;
//   const isSuccess = changePasswordMutation.isSuccess;

//   // ===================================================
//   // Render
//   // ===================================================

//   return (
//     <div className="min-h-screen bg-[#080a0f] text-white">
//       {/* =================================================
//           Header
//       ================================================= */}

//       <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-7 sm:px-8 lg:px-10">
//         <Link
//           to="/"
//           className="
//             group
//             flex
//             items-center
//             gap-3
//             text-sm
//             text-slate-300
//             transition
//             hover:text-white
//             sm:text-base
//           "
//         >
//           <ArrowLeft
//             size={22}
//             strokeWidth={1.8}
//             className="transition-transform duration-200 group-hover:-translate-x-1"
//           />

//           <span>Back to Home</span>
//         </Link>

       
//       </header>

//       {/* =================================================
//           Main
//       ================================================= */}

//       <main className="flex min-h-[calc(100vh-150px)] items-center justify-center px-4 pb-16 pt-8 sm:px-6">
//         <section
//           className="
//             w-full
//             max-w-120
//             rounded-3xl
//             border
//             border-slate-800/90
//             bg-[#0d1018]
//             px-5
//             py-8
//             shadow-[0_20px_70px_rgba(0,0,0,0.25)]
//             sm:px-8
//             sm:py-8
//           "
//         >
//           {/* =================================================
//               Heading
//           ================================================= */}

//           <div className="mb-9 text-center">
//             <div
//               className="
//                 mx-auto
//                 mb-6
//                 flex
//                 h-18
//                 w-18
//                 items-center
//                 justify-center
//                 rounded-full
//                 border
//                 border-violet-500/50
//                 bg-violet-500/3
//                 text-violet-500
//                 shadow-[0_0_35px_rgba(139,92,246,0.08)]
//               "
//             >
//               <LockKeyhole
//                 size={30}
//                 strokeWidth={1.3}
//               />
//             </div>

//             <h1 className="text-[28px] font-bold tracking-tight text-white sm:text-[23px]">
//               Change your password
//             </h1>

//           </div>

//           {/* =================================================
//               Success State
//           ================================================= */}

//           {isSuccess ? (
//             <div className="py-5 text-center">
//               <div
//                 className="
//                   mx-auto
//                   flex
//                   h-16
//                   w-16
//                   items-center
//                   justify-center
//                   rounded-full
//                   border
//                   border-emerald-500/20
//                   bg-emerald-500/10
//                   text-emerald-400
//                 "
//               >
//                 <CheckCircle2
//                   size={30}
//                   strokeWidth={1.8}
//                 />
//               </div>

//               <h2 className="mt-5 text-xl font-semibold text-white">
//                 Password updated
//               </h2>

//               <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-400">
//                 Your password has been changed successfully.
//               </p>

//               <Link
//                 to="/"
//                 className="
//                   mt-7
//                   inline-flex
//                   items-center
//                   gap-2
//                   text-sm
//                   font-medium
//                   text-violet-400
//                   transition
//                   hover:text-violet-300
//                 "
//               >
//                 <ArrowLeft size={17} />
//                 Back to Home
//               </Link>
//             </div>
//           ) : (
//             <>
//               {/* =================================================
//                   API Error
//               ================================================= */}

//               {changePasswordMutation.isError && (
//                 <div
//                   role="alert"
//                   className="
//                     mb-6
//                     flex
//                     items-start
//                     gap-3
//                     rounded-xl
//                     border
//                     border-red-500/20
//                     bg-red-500/6
//                     px-4
//                     py-3.5
//                     text-sm
//                     text-red-300
//                   "
//                 >
//                   <AlertCircle
//                     size={18}
//                     className="mt-0.5 shrink-0"
//                   />

//                   <p>{getApiErrorMessage()}</p>
//                 </div>
//               )}

//               {/* =================================================
//                   Form
//               ================================================= */}

//               <form
//                 onSubmit={handleSubmit}
//                 noValidate
//                 className="space-y-6"
//               >
//                 <PasswordInput
//                   id="currentPassword"
//                   label="Current password"
//                   value={form.currentPassword}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   placeholder="Enter your current password"
//                   showPassword={showPassword.current}
//                   onTogglePassword={() =>
//                     togglePassword("current")
//                   }
//                   error={
//                     touched.currentPassword || submitAttempted
//                       ? errors.currentPassword
//                       : ""
//                   }
//                   touched={
//                     touched.currentPassword || submitAttempted
//                   }
//                   disabled={isSubmitting}
//                 />

//                 <PasswordInput
//                   id="newPassword"
//                   label="New password"
//                   value={form.newPassword}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   placeholder="Enter your new password"
//                   showPassword={showPassword.new}
//                   onTogglePassword={() =>
//                     togglePassword("new")
//                   }
//                   error={
//                     touched.newPassword || submitAttempted
//                       ? errors.newPassword
//                       : ""
//                   }
//                   touched={
//                     touched.newPassword || submitAttempted
//                   }
//                   disabled={isSubmitting}
//                 />

//                 {!errors.newPassword &&
//                   form.newPassword && (
//                     <p className="-mt-3 text-xs leading-5 text-slate-500">
//                       Password must be at least 8 characters and
//                       include uppercase, lowercase, number and
//                       special character.
//                     </p>
//                   )}

//                 <PasswordInput
//                   id="confirmPassword"
//                   label="Confirm new password"
//                   value={form.confirmPassword}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   placeholder="Confirm your new password"
//                   showPassword={showPassword.confirm}
//                   onTogglePassword={() =>
//                     togglePassword("confirm")
//                   }
//                   error={
//                     touched.confirmPassword || submitAttempted
//                       ? errors.confirmPassword
//                       : ""
//                   }
//                   touched={
//                     touched.confirmPassword || submitAttempted
//                   }
//                   disabled={isSubmitting}
//                 />

//                 {/* =================================================
//                     Submit
//                 ================================================= */}

//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="
//                     flex
//                     h-13
//                     w-full
//                     items-center
//                     justify-center
//                     gap-2
//                     rounded-xl
//                     bg-violet-600
//                     text-sm
//                     font-semibold
//                     text-white
//                     shadow-[0_8px_25px_rgba(124,58,237,0.18)]
//                     transition-all
//                     duration-200
//                     hover:bg-violet-500
//                     hover:shadow-[0_10px_30px_rgba(124,58,237,0.25)]
//                     focus:outline-none
//                     focus:ring-4
//                     focus:ring-violet-500/20
//                     disabled:cursor-not-allowed
//                     disabled:opacity-60
//                     disabled:hover:bg-violet-600
//                   "
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <Loader2
//                         size={19}
//                         className="animate-spin"
//                       />
//                       Updating password...
//                     </>
//                   ) : (
//                     "Update Password"
//                   )}
//                 </button>
//               </form>

             
//             </>
//           )}
//         </section>
//       </main>


//     </div>
//   );
// }

// export default ChangePassword;





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
