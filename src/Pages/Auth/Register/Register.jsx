import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerSchema } from "../../../Schema/RegisterSchema";
import { BeatLoader } from "react-spinners";
import { AuthContext } from "../../../Context/AuthContext";

function Register({ setIsRegister }) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const{setUserToken}=useContext(AuthContext)

  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    mode: "onBlur",
    resolver: zodResolver(registerSchema),
  });
  function handleSubmitForm(data) {
    // console.log(data);
    setIsLoading(true);
    axios
      .post("https://route-posts.routemisr.com/users/signup", data)
      .then((res) => {
        console.log(res.data.data.token);
       
        navigate("/login");
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
        console.log(error.response.data.message);
      }).finally(()=>{
setIsLoading(false)
      })
  }

  return (
    <div className="w-full bg-[#0f1218]">
      <div className="mb-5">
        <h1 className="text-5xl font-bold tracking-[-1.2px] lg:text-[30px]">Create an account</h1>
        <button type="button" onClick={() => setIsRegister(false)} className="mt-2 text-[13px] text-slate-400">
          Already have an account? <span className="cursor-pointer font-medium text-violet-400 underline decoration-violet-400/30 underline-offset-4 transition hover:text-violet-300">Log in</span>
        </button>
      </div>
      <form className="space-y-3" onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Full Name */}
          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-slate-200">Full Name</label>

            <div className="relative">
              <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.7" />
                  <path d="M5 20C5.8 16.6 8.1 14.8 12 14.8C15.9 14.8 18.2 16.6 19 20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
              </div>

              <input
                autoComplete="off"
                {...register(
                  "name",
                  //    {
                  //   required: { value: true, message: "name is required" },
                  //   minLength: { value: 3, message: "name must be at least 3 characters" },
                  //   maxLength: { value: 50, message: "name must be less than 50 characters" },
                  // }
                )}
                type="text"
                placeholder="Your full name"
                className={`h-12.5 w-full rounded-xl border bg-[#0d1016] pl-11 pr-4 text-[13px] text-white outline-none placeholder:text-slate-600 transition ${
                  errors.name && touchedFields.name ? "border-red-500/70 focus:border-red-500/80 focus:ring-4 focus:ring-red-500/8" : "border-white/10 focus:border-violet-500/60 focus:ring-4 focus:ring-violet-500/8"
                }`}
              />
            </div>
            {errors.name?.message && touchedFields.name && (
              <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-3.5 w-3.5 shrink-0">
                  <circle cx="12" cy="12" r="9" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16h.01" />
                </svg>
                {errors.name?.message}
              </p>
            )}
          </div>

          {/* Username */}
          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-slate-200">Username</label>

            <div className="relative">
              <div className="pointer-events-none absolute left-3.5 top-[45%] flex -translate-y-1/2 items-center text-slate-500">
                <span className="text-base">@</span>
              </div>

              <input
                {...register(
                  "username",
                  //    {
                  //   required: { value: true, message: "username is required" },
                  //   minLength: { value: 3, message: "username must be at least 3 characters" },
                  //   maxLength: { value: 50, message: "username must be less than 50 characters" },
                  //   pattern: { value: /^[a-zA-Z0-9_]+$/, message: "username can only contain letters, numbers, and underscores" },
                  // }
                )}
                type="text"
                // onChange={() => setErrorMessage(null)}
                placeholder="username"
                className={`h-12.5 w-full rounded-xl border bg-[#0d1016] pl-11 pr-4 text-[13px] text-white outline-none placeholder:text-slate-600 transition
  ${errors.username && touchedFields.username ? "border-red-500/70 focus:border-red-500/80 focus:ring-4 focus:ring-red-500/8" : "border-white/10 focus:border-violet-500/60 focus:ring-4 focus:ring-violet-500/8"}`}
              />
            </div>
            {errors.username?.message && touchedFields.username && (
              <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-3.5 w-3.5 shrink-0">
                  <circle cx="12" cy="12" r="9" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16h.01" />
                </svg>
                {errors.username?.message}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-slate-200">Email Address</label>
          <div className="relative">
            <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
                <path d="M4.5 7L12 13L19.5 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
            </div>

            <input
              {...register("email")}
              type="email"
              // onChange={() => setErrorMessage(null)}
              placeholder="you@example.com"
              className={`h-12.5 w-full rounded-xl border bg-[#0d1016] pl-11 pr-4 text-[13px] text-white outline-none placeholder:text-slate-600 transition
               ${errors.email && touchedFields.email ? "border-red-500/70 focus:border-red-500/80 focus:ring-4 focus:ring-red-500/8" : "border-white/10 focus:border-violet-500/60 focus:ring-4 focus:ring-violet-500/8"}`}
            />
          </div>
          {errors.email?.message && touchedFields.email && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-3.5 w-3.5 shrink-0">
                <circle cx="12" cy="12" r="9" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16h.01" />
              </svg>
              {errors.email?.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-slate-200">Password</label>

          <div className="relative">
            <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.7" />
                <path d="M8 10V7.5C8 5.29 9.79 3.5 12 3.5C14.21 3.5 16 5.29 16 7.5V10" stroke="currentColor" strokeWidth="1.7" />
              </svg>
            </div>

            <input
              type="password"
              placeholder="Create a password"
              className={`h-12.5 w-full rounded-xl border bg-[#0d1016] pl-11 pr-4 text-[13px] text-white outline-none placeholder:text-slate-600 transition
  ${errors.password && touchedFields.password ? "border-red-500/70 focus:border-red-500/80 focus:ring-4 focus:ring-red-500/8" : "border-white/10 focus:border-violet-500/60 focus:ring-4 focus:ring-violet-500/8"}
`}
              {...register("password")}
            />

            <button type="button" className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-violet-300">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
                <path d="M2.5 12C4.35 8.2 7.6 6 12 6C16.4 6 19.65 8.2 21.5 12C19.65 15.8 16.4 18 12 18C7.6 18 4.35 15.8 2.5 12Z" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>
          </div>
          {errors.password?.message && touchedFields.password && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-3.5 w-3.5 shrink-0">
                <circle cx="12" cy="12" r="9" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16h.01" />
              </svg>
              {errors.password?.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-slate-200">Confirm Password</label>
          <div className="relative">
            <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.7" />
                <path d="M8 10V7.5C8 5.29 9.79 3.5 12 3.5C14.21 3.5 16 5.29 16 7.5V10" stroke="currentColor" strokeWidth="1.7" />
              </svg>
            </div>

            <input
              {...register(
                "rePassword",
                //   {
                //   required: "Please confirm your password",
                //   validate: (value, formValues) => {
                //     return value === formValues.password || "Passwords do not match";
                //   },
                // }
              )}
              type="password"
              placeholder="Confirm your password"
              className={`h-12.5 w-full rounded-xl border bg-[#0d1016] pl-11 pr-4 text-[13px] text-white outline-none placeholder:text-slate-600 transition
  ${errors.rePassword && touchedFields.rePassword ? "border-red-500/70 focus:border-red-500/80 focus:ring-4 focus:ring-red-500/8" : "border-white/10 focus:border-violet-500/60 focus:ring-4 focus:ring-violet-500/8"}
`}
            />

            <button type="button" className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-violet-300">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
                <path d="M2.5 12C4.35 8.2 7.6 6 12 6C16.4 6 19.65 8.2 21.5 12C19.65 15.8 16.4 18 12 18C7.6 18 4.35 15.8 2.5 12Z" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>
          </div>
          {errors.rePassword?.message && touchedFields.rePassword && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-3.5 w-3.5 shrink-0">
                <circle cx="12" cy="12" r="9" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16h.01" />
              </svg>
              {errors.rePassword?.message}
            </p>
          )}
        </div>
        {/* date of birth */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-slate-200">Date of Birth</label>
            <input
              {...register("dateOfBirth", {
                required: "Date of birth is required",
              })}
              type="date"
              className={`h-12.5 w-full rounded-xl border bg-[#0d1016] pl-11 pr-4 text-[13px] text-white outline-none placeholder:text-slate-600 transition
  ${errors.dateOfBirth && touchedFields.dateOfBirth ? "border-red-500/70 focus:border-red-500/80 focus:ring-4 focus:ring-red-500/8" : "border-white/10 focus:border-violet-500/60 focus:ring-4 focus:ring-violet-500/8"}
`}
            />
            {errors.dateOfBirth?.message && touchedFields.dateOfBirth && (
              <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-3.5 w-3.5 shrink-0">
                  <circle cx="12" cy="12" r="9" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16h.01" />
                </svg>
                {errors.dateOfBirth?.message}
              </p>
            )}
          </div>
          {/* gender */}

          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-slate-200">Gender</label>
            <div className="relative">
              <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-4 w-4">
                  <circle cx="9" cy="8" r="3" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 21a5.5 5.5 0 0 1 11 0M16 4v6m-3-3h6" />
                </svg>
              </div>
              <select
                {...register("gender", {
                  required: "gender is required",
                })}
                className={`h-12.5 w-full rounded-xl border bg-[#0d1016] pl-11 pr-4 text-[13px] text-white outline-none placeholder:text-slate-600 transition
  ${errors.gender && touchedFields.gender ? "border-red-500/70 focus:border-red-500/80 focus:ring-4 focus:ring-red-500/8" : "border-white/10 focus:border-violet-500/60 focus:ring-4 focus:ring-violet-500/8"}
`}
              >
                <option value="" selected disabled>
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            {errors.gender?.message && touchedFields.gender && (
              <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-3.5 w-3.5 shrink-0">
                  <circle cx="12" cy="12" r="9" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16h.01" />
                </svg>
                {errors.gender?.message}
              </p>
            )}
          </div>
        </div>
        {errorMessage && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2.5 text-sm font-medium text-red-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-4 w-4 shrink-0">
              <circle cx="12" cy="12" r="9" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16h.01" />
            </svg>

            <span>{errorMessage}</span>
          </div>
        )}
        <button disabled={isLoading}
          type="submit"
          className="cursor-pointer disabled:cursor-not-allowed mt-1 h-12.5 w-full rounded-xl bg-linear-to-r from-violet-600 via-purple-600 to-violet-500 text-[13px] font-semibold text-white shadow-[0_10px_28px_rgba(124,58,237,0.22)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(124,58,237,0.32)] "
        >
          {isLoading ? <BeatLoader color="#fff" size={8} /> : " Create Account"}
        </button>
      </form>
    </div>
  );
}

export default Register;
