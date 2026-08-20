import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../Context/AuthContext";

function PostModal({ setIsOpen, isOpen, postId, isEdit = false }) {
  const [uploadeImg, setUploadeImg] = useState(null);

  const imageInputRef = useRef(null);
  const contentInputRef = useRef(null);
 const { userData } = useContext(AuthContext);

  const queryClient = useQueryClient();

  // =========================================
  // Prepare Form Data
  // =========================================

  function prepareFormData() {
    const formData = new FormData();

    if (imageInputRef.current?.files[0]) {
      formData.append("image", imageInputRef.current.files[0]);
    }

    if (contentInputRef.current?.value) {
      formData.append("body", contentInputRef.current.value);
    }

    return formData;
  }

  // =========================================
  // CREATE POST
  // =========================================

  function createPostFun() {
    return axios.post(
      "https://route-posts.routemisr.com/posts",
      prepareFormData(),
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  }

  // =========================================
  // EDIT POST
  // =========================================

  function editPostFun() {
    return axios.put(
      `https://route-posts.routemisr.com/posts/${postId}`,
      prepareFormData(),
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  }

  // =========================================
  // CREATE MUTATION
  // =========================================

  const {
    mutate: createPost,
    isPending: isCreating,
  } = useMutation({
    mutationFn: createPostFun,

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["getPost"],
        }),

        queryClient.invalidateQueries({
          queryKey: ["getProfilePosts"],
        }),
      ]);

      closeModal();
    },

    onError: (error) => {
      console.log(
        "Create post error:",
        error.response?.data || error.message
      );
    },
  });

  // =========================================
  // EDIT MUTATION
  // =========================================

  const {
    mutate: editPost,
    isPending: isEditing,
  } = useMutation({
    mutationFn: editPostFun,

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["getPost"],
        }),

        queryClient.invalidateQueries({
          queryKey: ["getProfilePosts"],
        }),
      ]);

      closeModal();
    },

    onError: (error) => {
      console.log(
        "Edit post error:",
        error.response?.data || error.message
      );
    },
  });

  // =========================================
  // CLOSE MODAL
  // =========================================

  function closeModal() {
    setIsOpen(false);

    setUploadeImg(null);

    if (contentInputRef.current) {
      contentInputRef.current.value = "";
    }

    if (imageInputRef.current) {
      imageInputRef.current.value = null;
    }
  }

  // =========================================
  // IMAGE PREVIEW
  // =========================================

  function handleImagePreview(e) {
    const file = e.target.files[0];

    if (!file) return;

    setUploadeImg(URL.createObjectURL(file));
  }

  // =========================================
  // SUBMIT
  // =========================================

  function handleSubmit() {
    if (isEdit) {
      editPost();
    } else {
      createPost();
    }
  }

  // =========================================
  // ESCAPE
  // =========================================

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const isPending = isCreating || isEditing;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-5"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          closeModal();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="post-modal-title"
        className="flex max-h-[calc(100vh-24px)] w-full max-w-137.5 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0f1218] shadow-[0_25px_80px_rgba(0,0,0,0.55)] sm:max-h-[calc(100vh-40px)]"
      >
        {/* Header */}

        <header className="flex items-center justify-between border-b border-white/10 px-4 py-4 sm:px-5">
          <h2
            id="post-modal-title"
            className="text-lg font-bold tracking-tight text-white sm:text-xl"
          >
            {isEdit ? "Edit Post" : "Create Post"}
          </h2>

          <button
            type="button"
            onClick={closeModal}
            aria-label="Close post modal"
            className="flex h-9 w-9 items-center justify-center rounded-full text-2xl leading-none text-gray-400 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            ×
          </button>
        </header>

        {/* Content */}

        <div className="overflow-y-auto px-4 py-5 sm:px-5">

          {/* User */}

          <div className="flex items-center gap-3">
            <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border border-white/8 bg-[#3a3a3a]">
              <img
                src={userData?.photo}
                alt="User"
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                {userData?.name}
              </p>

              <button
                type="button"
                className="mt-1 flex items-center gap-1 rounded-md text-xs text-gray-400 transition hover:text-white focus:outline-none"
              >
                Public

                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="m7 9 5 5 5-5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
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

          {/* Image */}

          <div className="mt-5 rounded-xl border border-white/10 bg-[#11151c] p-3">

            <p className="mb-3 px-1 text-sm font-semibold text-gray-300">
              Add to your post
            </p>

            <label
              htmlFor="postImage"
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 text-[#42d4d0]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <rect
                  x="3.5"
                  y="4"
                  width="17"
                  height="16"
                  rx="2"
                />

                <circle
                  cx="8.5"
                  cy="9"
                  r="1.5"
                />

                <path
                  d="m4.5 17 4.5-4.5 3.2 3 2.3-2.3 2.3-2.3 4.5 4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span>Photo / Video</span>

              <input
                type="file"
                hidden
                id="postImage"
                onChange={handleImagePreview}
                ref={imageInputRef}
              />
            </label>

            {uploadeImg && (
              <img
                src={uploadeImg}
                alt="Preview"
                className="mt-3 max-h-60 w-full rounded-xl object-cover"
              />
            )}
          </div>
        </div>

        {/* Footer */}

        <footer className="border-t border-white/10 bg-[#0f1218] p-4 sm:p-5">

          <button
            onClick={handleSubmit}
            disabled={isPending}
            type="button"
            className="h-13 w-full cursor-pointer rounded-xl bg-linear-to-r from-violet-600 via-purple-600 to-violet-500 text-[13px] font-semibold text-white shadow-[0_10px_28px_rgba(124,58,237,0.22)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(124,58,237,0.32)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending
              ? isEdit
                ? "Saving..."
                : "Posting..."
              : isEdit
                ? "Save Changes"
                : "Post"}
          </button>

        </footer>
      </div>
    </div>
  );
}

export default PostModal;