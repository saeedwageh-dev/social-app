import axios from "axios";
import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../Context/AuthContext";

function Comment({ comment, queryKey ,postId,isSinglePost}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment?.content || "");
const { userToken, userData } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const isMyComment =
  userData?._id === comment?.commentCreator?._id;

  const date = new Date(comment?.createdAt);

  const formattedDate = date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  // =========================
  // DELETE COMMENT
  // =========================

  function deleteComment() {
    return axios.delete(
      `https://route-posts.routemisr.com/posts/${postId}/comments/${comment._id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  }

  const {
    mutate: handleDelete,
    isPending: isDeleting,
  } = useMutation({
    mutationFn: deleteComment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      }),
        queryClient.invalidateQueries({
          queryKey: ["getPost"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["getProfilePosts"],
        });
        if(isSinglePost) queryClient.invalidateQueries({ queryKey: ["getSinglePost", postId] });
    },

    onError: (error) => {
      console.log(
        "Delete comment error:",
        error.response?.data || error.message
      );
    },
  });

  // =========================
  // UPDATE COMMENT
  // =========================

  function updateComment() {
    return axios.put(
      `https://route-posts.routemisr.com/posts/${postId}/comments/${comment._id}`,
      {
        content: editedContent,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  }

  const {
    mutate: handleUpdate,
    isPending: isUpdating,
  } = useMutation({
    mutationFn: updateComment,

    onSuccess: () => {
      setIsEditing(false);

      queryClient.invalidateQueries({
        queryKey: queryKey,
      }),
        queryClient.invalidateQueries({
          queryKey: ["getPost"],
      }),
        queryClient.invalidateQueries({
          queryKey: ["getProfilePosts"],
      })
              if(isSinglePost) queryClient.invalidateQueries({ queryKey: ["getSinglePost", postId] });

    },

    onError: (error) => {
      console.log(
        "Update comment error:",
        error.response?.data || error.message
      );
    },
  });

  function handleSaveEdit() {
    if (!editedContent.trim()) return;

    handleUpdate();
  }

  return (
    <div className="flex gap-3">
      {/* Avatar */}
      <img
        src={comment?.commentCreator?.photo}
        alt={comment?.commentCreator?.name}
        className="h-9 w-9 shrink-0 rounded-full object-cover ring-1 ring-[#414141]"
      />

      <div className="min-w-0 flex-1">

        {/* Comment Box */}
        <div className="rounded-xl bg-[#3431315f] px-3.5 py-3">

          {/* Header */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[#e2e2e2]">
              {comment?.commentCreator?.name}
            </span>

            <span className="text-[10px] text-[#656565]">
              {formattedDate}
            </span>
          </div>

          {/* Content */}
          {isEditing ? (
            <div className="mt-2">
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full resize-none rounded-lg border border-white/10 bg-[#1c1f25] p-2 text-xs leading-5 text-white outline-none focus:border-violet-500/50"
                rows={3}
              />

              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  disabled={isUpdating}
                  className="rounded-md bg-violet-600 px-3 py-1.5 text-[11px] font-medium text-white transition hover:bg-violet-500 disabled:opacity-50"
                >
                  {isUpdating ? "Saving..." : "Save"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setEditedContent(comment?.content || "");
                  }}
                  disabled={isUpdating}
                  className="rounded-md bg-white/5 px-3 py-1.5 text-[11px] text-gray-400 transition hover:bg-white/10 hover:text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="mt-1.5 text-xs leading-5 text-[#b3b3b3]">
              {comment?.content}
            </p>
          )}
        </div>

        {/* Image */}
        {comment?.image && (
          <div className="mt-2 w-28 overflow-hidden rounded-lg">
            <img
              src={comment.image}
              alt="Comment attachment"
              className="block h-20 w-full object-cover"
            />
          </div>
        )}

        {/* Actions */}
        {!isEditing && (
          <div className="mt-2 flex items-center gap-4 px-2 text-[10px] text-[#737373]">

            <button
              type="button"
              className="transition hover:text-[#8a96ff]"
            >
              Like
            </button>

            <button
              type="button"
              className="transition hover:text-[#8a96ff]"
            >
              Reply
            </button>

            {/* Edit */}
         {isMyComment && (
  <>
    <button
      type="button"
      onClick={() => setIsEditing(true)}
      className="transition hover:text-violet-400 cursor-pointer"
    >
      Edit
    </button>

    <button
      type="button"
      onClick={() => handleDelete()}
      disabled={isDeleting}
      className="transition hover:text-red-400 disabled:opacity-50 cursor-pointer"
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  </>
)}

          </div>
        )}
      </div>
    </div>
  );
}

export default Comment;