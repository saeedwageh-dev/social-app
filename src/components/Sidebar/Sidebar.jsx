import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

function Sidebar () {
 const {setUserToken}= useContext(AuthContext)
 const navigate=useNavigate()
  const logout = () => {
    localStorage.removeItem("token");
    setUserToken(null);
    navigate("/login");
  };
  const navLinkClass = ({ isActive }) =>
  `group flex h-14.5 items-center gap-4 rounded-xl border px-4 transition-all duration-200 ${
    isActive
      ? "border-[#222428ef] bg-[#151321] text-[#8B5CF6] shadow-[0_0_20px_rgba(124,77,255,0.008)]"
      : "border-transparent text-[#E4E4E8] hover:border-[#29213F] hover:bg-[#11111A]"
  }`;
  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-70 min-h-screen flex-col bg-[#0f1218] px-4 py-5 font-['Plus_Jakarta_Sans',sans-serif] text-[#F5F5F7]">
      {/* Brand */}
     <div className="mb-7 flex items-center gap-2.5">
              <div className="relative flex h-10 w-10 items-center justify-center">
                <div className="absolute inset-0 rounded-2xl bg-violet-600/20 blur-xl" />

                <svg viewBox="0 0 48 48" className="relative h-9 w-9" fill="none">
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

              <div className="text-[24px] font-bold tracking-[-1.2px]">
                <span className="text-white">Squa</span>
                <span className="bg-linear-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">Chat</span>
              </div>
            </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1.5">
        {/* Home */}
        <NavLink to={"/"} className={navLinkClass}>
          <svg width="23" height="23" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
            <path d="M3.5 10.7L12 3.8L20.5 10.7V20C20.5 20.55 20.05 21 19.5 21H4.5C3.95 21 3.5 20.55 3.5 20V10.7Z" fill="currentColor" />
            <path d="M9 21V14H15V21" fill="#151321" />
          </svg>

          <span className="text-[15px] font-semibold">Home</span>
        </NavLink>

        {/* Messages */}
        <div className="group flex h-14.5 cursor-pointer items-center gap-4 rounded-xl border border-transparent px-4 transition-all duration-200 hover:border-[#29213F] hover:bg-[#11111A]">
          <svg
            width="23"
            height="23"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0 text-[#B7B8C2] transition-colors group-hover:text-[#8B5CF6]"
          >
            <path
              d="M20 11.2C20 15.18 16.42 18.4 12 18.4C10.82 18.4 9.7 18.18 8.7 17.78L4.5 20L5.55 16.28C4.58 15 4 13.48 4 11.2C4 7.22 7.58 4 12 4C16.42 4 20 7.22 20 11.2Z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M8 11.5H8.01M12 11.5H12.01M16 11.5H16.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>

          <span className="flex-1 text-[15px] font-medium text-[#E4E4E8]">Messages</span>

          <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-[#5932C7] px-2 text-[12px] font-bold text-white shadow-[0_0_12px_rgba(89,50,199,0.3)]">
            3
          </span>
        </div>

        {/* Explore */}
        <div className="group flex h-14.5 cursor-pointer items-center gap-4 rounded-xl border border-transparent px-4 transition-all duration-200 hover:border-[#29213F] hover:bg-[#11111A]">
          <svg
            width="23"
            height="23"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0 text-[#B7B8C2] transition-colors group-hover:text-[#8B5CF6]"
          >
            <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.7" />
            <path d="M15.7 8.3L13.85 13.85L8.3 15.7L10.15 10.15L15.7 8.3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
          </svg>

          <span className="text-[15px] font-medium text-[#E4E4E8]">Explore</span>
        </div>

        {/* Notifications */}
        <div className="group flex h-14.5 cursor-pointer items-center gap-4 rounded-xl border border-transparent px-4 transition-all duration-200 hover:border-[#29213F] hover:bg-[#11111A]">
          <svg
            width="23"
            height="23"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0 text-[#B7B8C2] transition-colors group-hover:text-[#8B5CF6]"
          >
            <path
              d="M18 9.5C18 6.18 15.76 4 12 4C8.24 4 6 6.18 6 9.5C6 15.5 4 17 4 17H20C20 17 18 15.5 18 9.5Z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M9.8 20C10.35 20.63 11.1 21 12 21C12.9 21 13.65 20.63 14.2 20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>

          <span className="flex-1 text-[15px] font-medium text-[#E4E4E8]">Notifications</span>

          {/* <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-[#7C4DFF] px-2 text-[12px] font-bold text-white ">
            2
          </span> */}
        </div>

        {/* Profile */}
        <NavLink to={"/profile"} className={navLinkClass}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-6 w-6 shrink-0 text-[#7C4DFF] transition-all duration-200 group-hover:text-[#8B5CF6]"
          >
            <circle cx="12" cy="7.5" r="3.5" />
            <path d="M4.5 20c.7-3.3 3.1-5 7.5-5s6.8 1.7 7.5 5" strokeLinecap="round" />
          </svg>

          <span className="text-[15px] font-medium text-[#E8E8EC] transition-colors duration-200 group-hover:text-white">Profile</span>
        </NavLink>

        {/* Logout */}
        <button onClick={logout} className="group flex h-14.5 cursor-pointer items-center gap-4 rounded-xl border border-transparent px-4 transition-all duration-200 hover:border-[#29213F] hover:bg-[#11111A]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-6 w-6 shrink-0 text-[#B8BAC5] transition-colors duration-200 group-hover:text-[#EF6B73]"
          >
            <path d="M10 4H6.5A2.5 2.5 0 0 0 4 6.5v11A2.5 2.5 0 0 0 6.5 20H10" strokeLinecap="round" />
            <path d="M14 8l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 12h9" strokeLinecap="round" />
          </svg>

          <span className="text-[15px] font-medium text-[#E8E8EC] transition-colors duration-200 group-hover:text-[#F5F5F7]">Logout</span>
        </button>
      </nav>

      {/* Bottom Section */}
      <div className="mt-auto">
        <div className=" flex w-full flex-col gap-4 px-3 pb-2 text-[#F5F5F7]">
          {/* Create Post */}


          {/* Divider */}
          <div className="h-px w-full bg-white/10" />

          {/* Theme Toggle */}
          <div className="flex w-full items-center rounded-2xl border border-[#242630] bg-[#0F1117] p-1">
            <button
              type="button"
              className="group flex min-w-0 flex-1 items-center justify-center gap-2 rounded-xl px-3 py-3 text-[#9A9CA8] transition-all duration-200 hover:bg-[#151721] hover:text-[#F5F5F7]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5 shrink-0"
              >
                <circle cx="12" cy="12" r="3.5" />
                <path
                  d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"
                  strokeLinecap="round"
                />
              </svg>

              <span className="text-[14px] font-medium">Light</span>
            </button>

            <button
              type="button"
              className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-xl border border-[#7C4DFF]/20 bg-[#7C4DFF]/10 px-3 py-3 text-[#8B5CF6] shadow-[0_0_20px_rgba(124,77,255,0.08)] transition-all duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5 shrink-0"
              >
                <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              <span className="text-[14px] font-semibold">Dark</span>
            </button>
          </div>

          {/* Collapse */}
          <button
            type="button"
            className="group flex w-full items-center gap-4 rounded-2xl border border-[#242630] bg-[#0F1117] p-3 text-left transition-all duration-200 hover:border-[#7C4DFF]/25 hover:bg-[#151721]"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#151721] text-[#9A9CA8] transition-all duration-200 group-hover:bg-[#7C4DFF]/10 group-hover:text-[#7C4DFF]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>

            <span className="text-[15px] font-medium text-[#E8E8EC] transition-colors duration-200 group-hover:text-white">Collapse</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
