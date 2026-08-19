import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PostModal from "../Modal/Modal";

function CreatePost() {
  const [isOpen, setIsOpen] = useState(false);

  const { userToken, userData } = useContext(AuthContext);

  return (
    <>
      {/* ================= CREATE POST CARD ================= */}
      <section className="w-full rounded-2xl border border-white/6 bg-[#0f1218] p-4 shadow-[0_8px_30px_rgba(0,0,0,0.12)] sm:p-5">
        {/* Top Input */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/8 bg-[#3a3a3a]">
            <img src={userData?.photo} alt="Victor Emokpare" className="h-full w-full object-cover" />
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex h-10 min-w-0 flex-1 items-center rounded-lg bg-[#1e2023ef] px-4 text-left text-sm text-[#8f8f8f] transition hover:bg-[#393939] focus:outline-none focus:ring-2 focus:ring-[#42d4d0]/20"
          >
            What's on your mind?
          </button>
        </div>

        {/* Divider */}
        <div className="my-3.5 h-px bg-white/6" />

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 sm:gap-5">
            {/* Image */}
            <button type="button" className="flex items-center gap-2 rounded-lg px-1.5 py-1 text-sm text-[#d0d0d0] transition hover:bg-white/5 hover:text-white">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#42d4d0]" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3.5" y="4" width="17" height="16" rx="2" />
                <circle cx="8.5" cy="9" r="1.5" />
                <path d="m4.5 17 4.5-4.5 3.2 3 2.3-2.3 4.5 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              <span>Image</span>
            </button>

            {/* Video */}
            <button type="button" className="flex items-center gap-2 rounded-lg px-1.5 py-1 text-sm text-[#d0d0d0] transition hover:bg-white/5 hover:text-white">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#9b6cff]" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="6" width="12.5" height="12" rx="2" />
                <path d="m15.5 10 5-2.5v9l-5-2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              <span>Video</span>
            </button>

            {/* Poll */}
            <button type="button" className="flex items-center gap-2 rounded-lg px-1.5 py-1 text-sm text-[#d0d0d0] transition hover:bg-white/5 hover:text-white">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#f17b8a]" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M5 19V9M10 19V5M15 19v-7M20 19v-11" strokeLinecap="round" />

                <path d="M3.5 19.5h18" strokeLinecap="round" />
              </svg>

              <span>Poll</span>
            </button>
          </div>

          {/* Visibility */}
          <button type="button" className="flex items-center gap-2 rounded-lg px-2 py-1 text-sm text-[#d0d0d0] transition hover:bg-white/5 hover:text-white">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#c7c7c7]" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="8.5" />
              <circle cx="9" cy="9" r="1" fill="currentColor" stroke="none" />
              <circle cx="15" cy="9" r="1" fill="currentColor" stroke="none" />

              <path d="M8.5 14.5c1.8 1.7 5.2 1.7 7 0" strokeLinecap="round" />
            </svg>

            <span>Public</span>

            <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#9b9b9b]" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m7 9 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </section>

      {/* ================= CREATE POST MODAL ================= */}
      {isOpen && <PostModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  );
}

export default CreatePost;
