import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function CreatePost() {
  const [isOpen, setIsOpen] = useState(false);
  const [uploadeImg, setUploadeImg] = useState(null);
  const imageInputRef = useRef(null);
  const contentInputRef = useRef(null);
  const { userToken, userData } = useContext(AuthContext);
  const query = useQueryClient();

  function prepareFormData() {
    const formData = new FormData();
    if (imageInputRef.current.files[0]) {
      formData.append("image", imageInputRef.current.files[0]);
    }
    if (contentInputRef.current.value) {
      formData.append("body", contentInputRef.current.value);
    }

    return formData;
  }

  function createPostFun() {
    return axios.post(`https://route-posts.routemisr.com/posts`, prepareFormData(), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  const { data, mutate } = useMutation({
    mutationFn: createPostFun,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["getPost"] });
    },
  });
  console.log(data);

  function handleImagePreview(e) {
    console.log(e.target.files);
    setUploadeImg(URL.createObjectURL(e.target.files[0]));
  }

  // Close modal with Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setUploadeImg(null);
        imageInputRef.current.value = null;
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

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
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-5"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setIsOpen(false);
              setUploadeImg(null);
              imageInputRef.current.value = null;
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-post-title"
            className="flex max-h-[calc(100vh-24px)] w-full max-w-137.5 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0f1218] shadow-[0_25px_80px_rgba(0,0,0,0.55)] sm:max-h-[calc(100vh-40px)]"
          >
            {/* Modal Header */}
            <header className="flex items-center justify-between border-b border-white/10 px-4 py-4 sm:px-5">
              <h2 id="create-post-title" className="text-lg font-bold tracking-tight text-white sm:text-xl">
                Create Post
              </h2>

              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setUploadeImg(null);
                  imageInputRef.current.value = null;
                }}
                aria-label="Close create post modal"
                className="flex h-9 w-9 items-center justify-center rounded-full text-2xl leading-none text-gray-400 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/20"
              >
                ×
              </button>
            </header>

            {/* Modal Content */}
            <div className="overflow-y-auto px-4 py-5 sm:px-5">
              {/* User */}
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border border-white/8 bg-[#3a3a3a]">
                  <img src="https://i.pravatar.cc/100?img=12" alt="Victor Emokpare" className="h-full w-full object-cover" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">Victor Emokpare</p>

                  <button type="button" className="mt-1 flex items-center gap-1 rounded-md text-xs text-gray-400 transition hover:text-white focus:outline-none">
                    Public
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="m7 9 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Textarea */}
              <div className="mt-5">
                <textarea
                  ref={contentInputRef}
                  placeholder="What's on your mind?"
                  className="min-h-25 w-full resize-none rounded-xl border border-white/5 bg-[#0b0e13] p-4 text-[15px] leading-6 text-white placeholder:text-gray-500 transition focus:border-white/10 focus:outline-none focus:ring-1 focus:ring-white/10 sm:min-h-20"
                />
              </div>

              {/* Add To Post */}
              <div className="mt-5 rounded-xl border border-white/10 bg-[#11151c] p-3">
                <p className="mb-3 px-1 text-sm font-semibold text-gray-300">Add to your post</p>

                <div className="w-full">
                  {/* Photo */}
                  <label
                    htmlFor="postImage"
                    className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/10"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#42d4d0]" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="3.5" y="4" width="17" height="16" rx="2" />

                      <circle cx="8.5" cy="9" r="1.5" />

                      <path d="m4.5 17 4.5-4.5 3.2 3 2.3-2.3 4.5 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                    <span>Photo / Video</span>
                    <input type="file" hidden id="postImage" onChange={handleImagePreview} ref={imageInputRef} />
                  </label>
                </div>
                <img src={uploadeImg} alt="" />
              </div>
            </div>

            {/* Modal Footer */}
            <footer className="border-t border-white/10 bg-[#0f1218] p-4 sm:p-5">
              <button
                onClick={() => {
                  mutate();
                  setIsOpen(false);
                  setUploadeImg(null);
                }}
                type="button"
                className="cursor-pointer h-13 w-full rounded-xl bg-linear-to-r from-violet-600 via-purple-600 to-violet-500 text-[13px] font-semibold text-white shadow-[0_10px_28px_rgba(124,58,237,0.22)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(124,58,237,0.32)]"
              >
                Post
              </button>
            </footer>
          </div>
        </div>
      )}
    </>
  );
}

export default CreatePost;
