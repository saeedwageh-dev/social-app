import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PostModal from "../Modal/Modal";
import { useState } from "react";

function Dropdown({
  setIsMenuOpen,
  isMenuOpen,
  postId,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();

  // =========================
  // DELETE
  // =========================

  const deletePost = async (postId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("You are not authenticated");
    }

    return axios.delete(
      `https://route-posts.routemisr.com/posts/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const {
    mutate: handleDeletePost,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: deletePost,

    onSuccess: async () => {
      setIsMenuOpen(false);

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["getPost"],
        }),

        queryClient.invalidateQueries({
          queryKey: ["getProfilePosts"],
        }),
      ]);
    },

    onError: (error) => {
      console.error(
        "Failed to delete post:",
        error.response?.data || error.message
      );
    },
  });

  // =========================
  // DELETE CLICK
  // =========================

  const handleDeleteClick = (e) => {
    e.stopPropagation();

    if (isPending) return;

    handleDeletePost(postId);
  };

  // =========================
  // EDIT CLICK
  // =========================

  const handleEditClick = (e) => {
    e.stopPropagation();

    if (isPending) return;

    setIsMenuOpen(false);
    setIsOpen(true);
  };

  return (
    <>
      <div className="relative">

        {/* More */}

        <button
          type="button"
          aria-label="More options"
          aria-expanded={isMenuOpen}
          aria-haspopup="menu"
          onClick={(e) => {
            e.stopPropagation();

            if (isPending) return;

            setIsMenuOpen((prev) => !prev);
          }}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#8e8e8e] transition hover:bg-white/6 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/10"
        >
          <span className="text-xl leading-none">
            ⋯
          </span>
        </button>

        {/* Dropdown */}

        {isMenuOpen && (
          <div
            role="menu"
            className="absolute right-0 top-11 z-50 w-44 overflow-hidden rounded-xl border border-white/10 bg-[#171a21] p-1.5 shadow-[0_10px_35px_rgba(0,0,0,0.35)]"
          >

            {/* Edit */}

            <button
              type="button"
              role="menuitem"
              disabled={isPending}
              onClick={handleEditClick}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-200 transition hover:bg-white/8 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span>✏️</span>

              <span>
                Edit post
              </span>
            </button>

            <div className="my-1 border-t border-white/8" />

            {/* Delete */}

            <button
              type="button"
              role="menuitem"
              disabled={isPending}
              onClick={handleDeleteClick}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-400 transition hover:bg-red-500/10 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span>
                {isPending ? "⏳" : "🗑️"}
              </span>

              <span>
                {isPending
                  ? "Deleting..."
                  : "Delete post"}
              </span>
            </button>

          </div>
        )}

        {/* Error */}

        {isError && (
          <p className="absolute right-0 top-24 z-50 w-52 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-400">
            {error?.response?.data?.message ||
              "Failed to delete post. Please try again."}
          </p>
        )}
      </div>

      {/* EDIT MODAL */}

      {isOpen && (
        <PostModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          postId={postId}
          isEdit={true}
        />
      )}
    </>
  );
}

export default Dropdown;