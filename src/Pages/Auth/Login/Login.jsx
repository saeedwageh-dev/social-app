import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../../../Schema/LoginSchema";
import { BeatLoader } from "react-spinners";
import { AuthContext } from "../../../Context/AuthContext";


export default function Login({ setIsRegister }) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
 const{setUserToken} =useContext(AuthContext)

  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
  });

  function handleSubmitForm(data) {
    // console.log(data);
setIsLoading(true)
    axios
      .post("https://route-posts.routemisr.com/users/signin", data)
      .then((res) => {

        setUserToken(res?.data.data.token)
        localStorage.setItem("token",res?.data.data.token)
        navigate("/");
      })
      .catch((error) => {
        setErrorMessage(error?.response?.data?.message);
      }).finally(()=>{
        setIsLoading(false)
      })
  }
  return (
    <div className={` w-full bg-[#0f1218] `}>
      <div className="mb-6">
        <h1 className="text-5xl font-bold tracking-[-1.2px] lg:text-[30px]">Log in</h1>

        <button type="button" onClick={() => setIsRegister(true)} className="mt-2.5 text-[13px] text-slate-400">
          Don&apos;t have an account? <span className="cursor-pointer font-medium text-violet-400 underline decoration-violet-400/30 underline-offset-4 transition hover:text-violet-300">Create an Account</span>
        </button>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit(handleSubmitForm)}>
        {/* Email */}
        <div>
          <label className="mb-2 block text-[13px] font-medium text-slate-200">Email Address</label>
          <div className="group/input relative">
            <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 transition group-focus-within/input:text-violet-400">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
                <path d="M4.5 7L12 13L19.5 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <input
              {...register("email")}
              type="email"
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
          <label className="mb-2 block text-[13px] font-medium text-slate-200">Password</label>

          <div className="group/input relative">
            <div className="pointer-events-none absolute left-3.5 top-[45%] flex -translate-y-1/2 items-center text-slate-500 transition group-focus-within/input:text-violet-400">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
                <rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.7" />
                <path d="M8 10V7.5C8 5.29 9.79 3.5 12 3.5C14.21 3.5 16 5.29 16 7.5V10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
            </div>

            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={`h-12.5 w-full rounded-xl border bg-[#0d1016] pl-11 pr-4 text-[13px] text-white outline-none placeholder:text-slate-600 transition
             ${errors.password && touchedFields.password ? "border-red-500/70 focus:border-red-500/80 focus:ring-4 focus:ring-red-500/8" : "border-white/10 focus:border-violet-500/60 focus:ring-4 focus:ring-violet-500/8"}`}
            />
          <button
  onClick={() => setShowPassword(!showPassword)}
  type="button"
  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-violet-300 transition-colors"
>
  {showPassword ? (
    // Eye Off
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M3 3L21 21"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M10.6 10.6a2 2 0 0 0 2.8 2.8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M9.9 5.2A10.8 10.8 0 0 1 12 5c4.4 0 7.65 2.2 9.5 7a14.2 14.2 0 0 1-2.5 4.1M6.2 6.2C4.6 7.5 3.35 9.4 2.5 12c1.85 4.8 5.1 7 9.5 7 1.2 0 2.3-.18 3.3-.52"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    // Eye
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M2.5 12C4.35 8.2 7.6 6 12 6C16.4 6 19.65 8.2 21.5 12C19.65 15.8 16.4 18 12 18C7.6 18 4.35 15.8 2.5 12Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle
        cx="12"
        cy="12"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  )}
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

        <div className="flex justify-end pt-0.5">
          <button type="button" className="text-[13px] font-medium text-violet-400 underline underline-offset-4 transition hover:text-violet-300">
            Forgot Password?
          </button>
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
          className="cursor-pointer disabled:cursor-not-allowed h-13 w-full rounded-xl bg-linear-to-r from-violet-600 via-purple-600 to-violet-500 text-[13px] font-semibold text-white shadow-[0_10px_28px_rgba(124,58,237,0.22)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(124,58,237,0.32)]"
        >
         {isLoading?<BeatLoader color="#fff" size={8} />:" Log in"}
        </button>

        <label className="flex cursor-pointer items-center gap-2.5 text-[12px] text-slate-400">
          <input type="checkbox" className="peer sr-only" defaultChecked />

          <span className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-[5px] border border-white/10 bg-[#10131a] peer-checked:border-violet-500 peer-checked:bg-violet-600">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M5 12.5L9.5 17L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>

          <span>
            I agree to the <span className="text-violet-400 underline underline-offset-4">Terms &amp; Condition</span>
          </span>
        </label>

        <div className="flex items-center gap-3 py-0.5">
          <div className="h-px flex-1 bg-white/8" />
          <span className="text-[12px] text-slate-500">or</span>
          <div className="h-px flex-1 bg-white/8" />
        </div>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          <button
            type="button"
            className="flex h-12 items-center justify-center gap-2.5 rounded-xl border border-white/9 bg-[#0d1016] text-[12px] font-medium text-slate-200 transition hover:border-white/16 hover:bg-[#11141b]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M21.35 12.27c0-.71-.06-1.4-.18-2.05H12v3.88h5.23a4.47 4.47 0 0 1-1.94 2.93v2.43h3.14c1.84-1.69 2.92-4.18 2.92-7.19Z" />
              <path fill="#34A853" d="M12 21.75c2.63 0 4.83-.87 6.43-2.34l-3.14-2.43c-.87.58-1.98.93-3.29.93-2.53 0-4.68-1.71-5.45-4.01H3.3v2.5A9.72 9.72 0 0 0 12 21.75Z" />
              <path fill="#FBBC05" d="M6.55 13.9a5.84 5.84 0 0 1 0-3.8V7.6H3.3a9.75 9.75 0 0 0 0 8.8l3.25-2.5Z" />
              <path fill="#EA4335" d="M12 6.09c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.82 3.23 14.62 2.25 12 2.25a9.72 9.72 0 0 0-8.7 5.35l3.25 2.5C7.32 7.8 9.47 6.09 12 6.09Z" />
            </svg>
            Continue with Google
          </button>

          <button
            type="button"
            className="flex h-12 items-center justify-center gap-2.5 rounded-xl border border-white/9 bg-[#0d1016] text-[12px] font-medium text-slate-200 transition hover:border-white/16 hover:bg-[#11141b]"
          >
            <svg width="19" height="19" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" fill="#1877F2" />
              <path fill="white" d="M13.5 20v-7h2.35l.35-2.72H13.5V8.54c0-.79.22-1.33 1.36-1.33h1.45V4.78c-.25-.03-1.1-.1-2.09-.1-2.07 0-3.49 1.26-3.49 3.57v2.03H8.39V13h2.34v7h2.77Z" />
            </svg>
            Continue with Facebook
          </button>
        </div>
      </form>
    </div>
  );
}
