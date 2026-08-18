import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function Dropdown({ setIsMenuOpen, isMenuOpen, postId }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  function deletePost() {
    return axios.delete(`https://route-posts.routemisr.com/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  const { mutate: handleDeletePost, isPending } = useMutation({
    mutationFn: deletePost,

    onSuccess: () => {
      // Close dropdown
      setIsMenuOpen(false);

      // Refresh posts
      (queryClient.invalidateQueries({
        queryKey: ["getPost"],
      }),
        queryClient.invalidateQueries({
          queryKey: ["getProfilePosts"],
        }));
      navigate("/");
    },

    onError: (error) => {
      console.log(error);
    },
  });

  function handleDeleteClick(e) {
    e.stopPropagation();
    handleDeletePost();
  }

  return (
    <div className="relative">
      {/* More Button */}
      <button
        type="button"
        aria-label="More options"
        onClick={(e) => {
          e.stopPropagation();
          setIsMenuOpen((prev) => !prev);
        }}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#8e8e8e] transition hover:bg-white/6 hover:text-white"
      >
        <span className="text-xl leading-none">⋯</span>
      </button>

      {/* Dropdown */}
      {isMenuOpen && (
        <div className="absolute right-0 top-11 z-50 w-44 overflow-hidden rounded-xl border border-white/10 bg-[#171a21] p-1.5 shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
          {/* Edit */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-200 transition hover:bg-white/8"
          >
            <span>✏️</span>
            <span>Edit post</span>
          </button>

          <div className="my-1 border-t border-white/8" />

          {/* Delete */}
          <button
            type="button"
            disabled={isPending}
            onClick={handleDeleteClick}
            className="cursor-pointer flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-400 transition hover:bg-red-500/10 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span>🗑️</span>

            <span>{isPending ? "Deleting..." : "Delete post"}</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
