import { useEffect, useState } from "react";
import Login from "./Login/Login";
import Register from "./Register/Register";
import { useLocation, useNavigate } from "react-router-dom";

export default function Auth() {
   const location = useLocation();
  const navigate = useNavigate();

  const isRegister = location.pathname === "/register";

  const [displayedAuth, setDisplayedAuth] = useState(
    isRegister ? "register" : "login"
  );

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (displayedAuth === (isRegister ? "register" : "login")) return;

    // Start exit animation
    setIsVisible(false);

    // After exit animation, change component
    const timer = setTimeout(() => {
      setDisplayedAuth(isRegister ? "register" : "login");

      // Start enter animation
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [isRegister, displayedAuth]);

  const handleAuthToggle = (register) => {
    navigate(register ? "/register" : "/login");
  };
  return (
    <div className=" w-full min-h-screen overflow-hidden bg-[#0f1218] px-2 font-['Plus_Jakarta_Sans'] text-white sm:px-3 sm:py-3 lg:px-5 lg:py-2">
      <div className="group relative mx-auto flex min-h-[calc(100vh-16px)] max-w-300 overflow-hidden rounded-[22px] sm:min-h-[calc(100vh-24px)] lg:min-h-[calc(100vh-40px)]">
        <input id="auth-toggle" type="checkbox" className="peer absolute h-0 w-0 opacity-0" />
        {/* =========================
            AUTHENTICATION FORM PANEL
        ========================== */}
        <section
          className={`
    relative z-20 flex w-full shrink-0 flex-col justify-center
     px-5 py-7 
    transition-all duration-700
    ease-[cubic-bezier(0.65,0,0.35,1)]
    md:w-1/2 md:px-7 lg:px-10 xl:px-12
    ${isRegister ? "translate-x-full" : "translate-x-0"}
  `}
        >
          <div className="mx-auto w-full max-w-115">
            {/* Logo */}
            <div className={`mb-5 flex items-center gap-2.5 `}>
              <div className="relative flex h-8 w-8 items-center justify-center">
                <div className="absolute inset-0 rounded-2xl bg-violet-600/20 blur-xl" />

                <svg viewBox="0 0 48 48" className="relative h-8 w-8" fill="none">
                  <path
                    d="M24 5.5C13.78 5.5 5.5 12.98 5.5 22.2C5.5 28.05 8.72 33.15 13.75 36.1L12.3 42.5L18.8 38.25C20.45 38.68 22.2 38.9 24 38.9C34.22 38.9 42.5 31.42 42.5 22.2C42.5 12.98 34.22 5.5 24 5.5Z"
                    stroke="url(#logoGradient)"
                    strokeWidth="2.7"
                  />
                  <path d="M17.5 21.8H17.52M24 21.8H24.02M30.5 21.8H30.52" stroke="#C084FC" strokeWidth="3.5" strokeLinecap="round" />

                  <defs>
                    <linearGradient id="logoGradient" x1="7" y1="7" x2="41" y2="40" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#8B5CF6" />
                      <stop offset="1" stopColor="#A855F7" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div className="text-[25px] font-bold tracking-[-1.2px]">
                <span className="text-white">Squa</span>
                <span className="bg-linear-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">Chat</span>
              </div>
            </div>

            {/* =========================
                LOGIN
            ========================== */}
            <div className="relative w-full min-h-150 overflow-y-auto scrollbar-none">
 
  {displayedAuth === "login" ? (
        <div
          className={`
            absolute inset-0
            transition-all duration-500 ease-in-out
            ${
              isVisible
                ? "scale-100 opacity-100"
                : "scale-95 opacity-0"
            }
          `}
        >
          <Login setIsRegister={handleAuthToggle} />
        </div>
      ) : (
        <div
          className={`
            absolute inset-0
            transition-all duration-500 ease-in-out
            ${
              isVisible
                ? "scale-100 opacity-100"
                : "scale-95 opacity-0"
            }
          `}
        >
          <Register setIsRegister={handleAuthToggle} />
        </div>
      )}
  {/* LOGIN */}
  {/* <div
    className={`
      absolute inset-0
      transition-all duration-500 ease-in-out
      ${
        isRegister
          ? "pointer-events-none scale-95 opacity-0"
          : "pointer-events-auto scale-100 opacity-100"
      }
    `}
  >
    <Login setIsRegister={handleAuthToggle} />
  </div> */}

  {/* REGISTER */}
  {/* <div
    className={`
      absolute inset-0 
      transition-all duration-500 ease-in-out
      ${
        isRegister
          ? "pointer-events-auto scale-100 opacity-100"
          : "pointer-events-none scale-95 opacity-0"
      }
    `}
  >
    <Register setIsRegister={handleAuthToggle} />
  </div> */}
</div>
            {/* =========================
                REGISTER
            ========================== */}
          </div>
        </section>

        {/* =========================
            SOCIAL MEDIA VISUAL PANEL
        ========================== */}
        <section
          className={`
    absolute inset-y-0 z-10 hidden w-1/2
    overflow-hidden 
    transition-all duration-700
    ease-[cubic-bezier(0.65,0,0.35,1)]
    md:block
    ${isRegister ? "left-0" : "left-1/2"}
  `}
        >
          <div className="absolute inset-0 bg-[#0f1218]  " />

          <div className="absolute left-[12%] top-[14%] h-1 w-1 rounded-full bg-violet-400 shadow-[0_0_14px_4px_rgba(139,92,246,0.45)]" />
          <div className="absolute right-[18%] top-[18%] h-1 w-1 rounded-full bg-blue-400 shadow-[0_0_14px_4px_rgba(59,130,246,0.5)]" />
          <div className="absolute left-[18%] top-[48%] h-1 w-1 rounded-full bg-purple-300" />
          <div className="absolute bottom-[27%] right-[17%] h-1 w-1 rounded-full bg-violet-300" />

          <div className="relative flex h-full flex-col items-center justify-center px-6 py-7 lg:px-10">
            <div className="relative h-87.5 w-full max-w-130">
              {/* Rings */}
              <div className="absolute left-1/2 top-1/2 h-71.25 w-71.25 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-500/20" />
              <div className="absolute left-1/2 top-1/2 h-56.25 w-56.25 -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-400/10" />

              {/* Connections */}
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 650 430" fill="none">
                <path d="M125 105C220 125 230 160 325 215" stroke="url(#line1)" strokeWidth="1.2" strokeDasharray="7 9" />
                <path d="M510 105C430 120 400 160 325 215" stroke="url(#line2)" strokeWidth="1.2" strokeDasharray="7 9" />
                <path d="M92 315C190 280 235 270 325 215" stroke="url(#line3)" strokeWidth="1.2" strokeDasharray="7 9" />
                <path d="M555 305C475 275 410 270 325 215" stroke="url(#line4)" strokeWidth="1.2" strokeDasharray="7 9" />
                <path d="M325 215C325 160 325 125 325 85" stroke="url(#line5)" strokeWidth="1.2" strokeDasharray="6 10" />

                <defs>
                  <linearGradient id="line1" x1="125" y1="105" x2="325" y2="215">
                    <stop stopColor="#7C3AED" stopOpacity="0" />
                    <stop offset="0.5" stopColor="#A855F7" stopOpacity="0.8" />
                    <stop offset="1" stopColor="#3B82F6" stopOpacity="0.15" />
                  </linearGradient>

                  <linearGradient id="line2" x1="510" y1="105" x2="325" y2="215">
                    <stop stopColor="#3B82F6" stopOpacity="0" />
                    <stop offset="0.5" stopColor="#8B5CF6" stopOpacity="0.8" />
                    <stop offset="1" stopColor="#A855F7" stopOpacity="0.15" />
                  </linearGradient>

                  <linearGradient id="line3" x1="92" y1="315" x2="325" y2="215">
                    <stop stopColor="#6366F1" stopOpacity="0" />
                    <stop offset="0.5" stopColor="#8B5CF6" stopOpacity="0.8" />
                    <stop offset="1" stopColor="#C084FC" stopOpacity="0.1" />
                  </linearGradient>

                  <linearGradient id="line4" x1="555" y1="305" x2="325" y2="215">
                    <stop stopColor="#A855F7" stopOpacity="0" />
                    <stop offset="0.5" stopColor="#8B5CF6" stopOpacity="0.8" />
                    <stop offset="1" stopColor="#60A5FA" stopOpacity="0.1" />
                  </linearGradient>

                  <linearGradient id="line5" x1="325" y1="215" x2="325" y2="85">
                    <stop stopColor="#8B5CF6" />
                    <stop offset="1" stopColor="#3B82F6" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Central glow */}
              <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-[50px]" />

              {/* Central community icon */}
              <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[34px] border border-violet-400/40 bg-linear-to-br from-violet-500/30 via-purple-700/25 to-blue-600/20 shadow-[0_0_55px_rgba(124,58,237,0.35),inset_0_0_28px_rgba(139,92,246,0.12)] backdrop-blur-xl">
                <svg width="60" height="60" viewBox="0 0 74 74" fill="none">
                  <path
                    d="M37 13C22.64 13 11 22.94 11 35.2C11 42.85 15.43 49.54 22.3 53.38L20.4 62L29.1 56.36C31.57 57.03 34.22 57.4 37 57.4C51.36 57.4 63 47.46 63 35.2C63 22.94 51.36 13 37 13Z"
                    fill="url(#bubble)"
                    stroke="#C084FC"
                    strokeWidth="1.8"
                  />
                  <circle cx="28" cy="35" r="4" fill="white" />
                  <circle cx="37" cy="35" r="4" fill="white" />
                  <circle cx="46" cy="35" r="4" fill="white" />

                  <defs>
                    <linearGradient id="bubble" x1="15" y1="15" x2="59" y2="60">
                      <stop stopColor="#8B5CF6" stopOpacity="0.75" />
                      <stop offset="1" stopColor="#4F46E5" stopOpacity="0.35" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Avatar 1 */}
              <div className="absolute left-[8%] top-[14%] flex h-17 w-17 items-center justify-center rounded-full border border-violet-400/50 bg-[#161024] shadow-[0_0_28px_rgba(124,58,237,0.18)]">
                <div className="flex h-13 w-13 items-center justify-center rounded-full bg-linear-to-br from-violet-400/40 to-blue-500/20">
                  <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="14" r="7" fill="#C4B5FD" />
                    <path d="M8 34C8.9 26.8 13 23.5 20 23.5C27 23.5 31.1 26.8 32 34" fill="#A78BFA" />
                  </svg>
                </div>
              </div>

              {/* Avatar 2 */}
              <div className="absolute right-[8%] top-[14%] flex h-17 w-17 items-center justify-center rounded-full border border-blue-400/40 bg-[#111026] shadow-[0_0_28px_rgba(59,130,246,0.16)]">
                <div className="flex h-13 w-13 items-center justify-center rounded-full bg-linear-to-br from-blue-400/30 to-violet-500/30">
                  <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="14" r="7" fill="#C4B5FD" />
                    <path d="M8 34C8.9 26.8 13 23.5 20 23.5C27 23.5 31.1 26.8 32 34" fill="#818CF8" />
                  </svg>
                </div>
              </div>

              {/* Avatar 3 */}
              <div className="absolute bottom-[10%] left-[8%] flex h-16.25 w-16.25 items-center justify-center rounded-full border border-purple-400/40 bg-[#171023] shadow-[0_0_25px_rgba(168,85,247,0.15)]">
                <div className="flex h-12.5 w-12.5 items-center justify-center rounded-full bg-linear-to-br from-purple-400/40 to-pink-500/10">
                  <svg width="31" height="31" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="14" r="7" fill="#DDD6FE" />
                    <path d="M8 34C8.9 26.8 13 23.5 20 23.5C27 23.5 31.1 26.8 32 34" fill="#A78BFA" />
                  </svg>
                </div>
              </div>

              {/* Avatar 4 */}
              <div className="absolute bottom-[11%] right-[8%] flex h-16.25 w-16.25 items-center justify-center rounded-full border border-violet-400/40 bg-[#151025] shadow-[0_0_25px_rgba(139,92,246,0.15)]">
                <div className="flex h-12.5 w-12.5 items-center justify-center rounded-full bg-linear-to-br from-violet-400/40 to-blue-500/20">
                  <svg width="31" height="31" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="14" r="7" fill="#DDD6FE" />
                    <path d="M8 34C8.9 26.8 13 23.5 20 23.5C27 23.5 31.1 26.8 32 34" fill="#8B5CF6" />
                  </svg>
                </div>
              </div>

              {/* Like */}
              <div className="absolute left-[25%] top-[42%] flex h-14 w-14 rotate-[-8deg] items-center justify-center rounded-[18px] border border-pink-400/30 bg-linear-to-br from-pink-500/30 to-violet-600/20 shadow-[0_0_25px_rgba(236,72,153,0.2)] backdrop-blur-xl">
                <svg width="27" height="27" viewBox="0 0 32 32" fill="none">
                  <path
                    d="M16 27C15.5 27 5 20.4 5 12.7C5 8.4 8 6 11.4 6C13.45 6 15.15 7.05 16 8.65C16.85 7.05 18.55 6 20.6 6C24 6 27 8.4 27 12.7C27 20.4 16.5 27 16 27Z"
                    fill="#F9A8D4"
                  />
                </svg>
              </div>

              {/* Comment */}
              <div className="absolute right-[20%] top-[45%] flex h-12 w-17 items-center justify-center rounded-xl border border-violet-400/30 bg-violet-500/20 shadow-[0_0_22px_rgba(139,92,246,0.2)] backdrop-blur-xl">
                <div className="flex gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-200" />
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-300" />
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                </div>
              </div>

              {/* Share */}
              <div className="absolute left-[35%] top-[6%] flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.12)] backdrop-blur-xl">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
                  <path d="M20 4L10.5 13.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                  <path d="M20 4L14 20L10.5 13.5L4 10L20 4Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Notification */}
              <div className="absolute bottom-[25%] right-[27%] flex h-9 w-9 items-center justify-center rounded-full border border-violet-400/30 bg-violet-500/15 text-violet-300 backdrop-blur-xl">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 9C18 5.69 15.31 3 12 3C8.69 3 6 5.69 6 9C6 14.25 4 15.5 4 17H20C20 15.5 18 14.25 18 9Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path d="M10 20H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>

                <span className="absolute right-0 top-0 h-2 w-2 rounded-full border border-[#0a0618] bg-violet-400" />
              </div>

              {/* Reaction */}
              <div className="absolute bottom-[35%] left-[14%] flex h-9 w-9 items-center justify-center rounded-full border border-blue-400/20 bg-blue-500/10 text-blue-300 backdrop-blur-xl">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M8 11V20M8 11L10.5 4.5C10.8 3.7 11.7 3.3 12.5 3.7C13.2 4 13.5 4.8 13.2 5.5L12 10H18.5C19.9 10 20.8 11.4 20.3 12.7L18.2 18.2C17.8 19.3 16.7 20 15.5 20H8"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M4 11H8V20H4V11Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* Visual Text */}
            <div className="relative z-10 mt-1 text-center">
              <h2 className="text-2xl font-bold tracking-[-0.8px] lg:text-[30px]">
                Connect. Share.{" "}
                <span className="bg-linear-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">Belong.</span>
              </h2>

              <p className="mx-auto mt-3 max-w-110 text-[13px] leading-6 text-slate-400">
                Join conversations, share your world, and build meaningful connections.
              </p>

              <div className="mx-auto mt-5 flex items-center justify-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-violet-400" />
                <span className="h-1 w-6 rounded-full bg-violet-500/70" />
                <span className="h-1 w-1 rounded-full bg-blue-400/60" />
              </div>
            </div>
          </div>
        </section>

        {/* MOBILE */}
        <div className="absolute bottom-0 left-0 right-0 z-0 hidden h-40 overflow-hidden bg-[#0a0618] md:hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(124,58,237,0.25),transparent_55%)]" />

          <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-violet-400/30 bg-violet-600/20 shadow-[0_0_40px_rgba(124,58,237,0.3)]">
            <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
              <path
                d="M24 7C14.6 7 7 13.4 7 21.3C7 26.2 9.9 30.4 14.1 32.9L13 38L18.1 34.7C19.9 35.1 21.9 35.3 24 35.3C33.4 35.3 41 28.9 41 21.3C41 13.4 33.4 7 24 7Z"
                fill="#8B5CF6"
                fillOpacity="0.45"
                stroke="#C084FC"
                strokeWidth="1.5"
              />
              <circle cx="18" cy="21" r="2.5" fill="white" />
              <circle cx="24" cy="21" r="2.5" fill="white" />
              <circle cx="30" cy="21" r="2.5" fill="white" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
