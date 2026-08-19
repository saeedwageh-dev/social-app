import { Link } from "react-router-dom";
import Comment from "../Comment/Comment";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import CreateComment from "../CreateComment/CreateComment";
import Dropdown from "../Dropdown/Dropdown";

function Post({ post, isSinglePost = false }) {
  const { userToken, userData } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const date = new Date(post.createdAt);
  const formattedDate = date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  // console.log(post.id);

  function getPostComment() {
    return axios.get(`https://route-posts.routemisr.com/posts/${post?.id}/comments`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }
  const { data } = useQuery({
    queryKey: ["getPostComments", post?.id],
    queryFn: getPostComment,
    select: (data) => {
      return data?.data.data.comments;
    },
    enabled: isSinglePost,
  });
  // console.log(data)

  return (
    <>
      <article className="w-full overflow-hidden rounded-2xl border border-white/6 bg-[#0f1218] text-white shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 sm:px-5 sm:pt-5">
          {/* User */}
          <Link to={`/postDetails/${post.id}`} className="flex min-w-0 items-center gap-3">
            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/8 bg-[#3a3a3a]">
              <img src={post.user.photo} alt={post.user.name} className="h-full w-full object-cover" />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">{post.user.name}</p>

              <p className="mt-0.5 text-[11px] text-[#8e8e8e]">{formattedDate}</p>
            </div>
          </Link>

          {/* Dropdown */}
          {userData?._id === post?.user?._id && <Dropdown postId={post.id} setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />}
        </div>

        {/* Content */}
        <Link to={`/postDetails/${post.id}`}>
          <div className="px-4 pt-3 sm:px-5">
            {post.body && <p className="text-sm leading-6 text-[#d2d2d2]">{post.body}</p>}

            {post.image && (
              <div className="mt-3 overflow-hidden rounded-xl bg-[#1f1f1f]">
                <img src={post.image} alt="Colorful abstract artwork" className="block aspect-video w-full object-cover sm:aspect-[1.65/1]" />
              </div>
            )}
          </div>
        </Link>

        {/* Meta */}
        <div className="flex items-center justify-between gap-3 px-4 py-3 text-[10px] text-[#8d8d8d] sm:px-5">
          <span className="truncate">{post.likesCount <= 0 ? "" : post.likesCount} like</span>

          <div className="flex shrink-0 items-center gap-3">
            <span>{data?.length} Comments</span>

            <span>{post.shareCount <= 0 ? "" : post.sharesCount} shared</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mx-4 border-t border-white/6 sm:mx-5">
          <div className="flex items-center justify-between py-1">
            {/* Like */}
            <button
              type="button"
              aria-label="Like post"
              className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-lg px-2 py-2.5 text-sm text-[#c6c6c6] transition hover:bg-white/5 hover:text-white sm:justify-start sm:px-2"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M7 10v10H4a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h3ZM7 20h9.2a2.8 2.8 0 0 0 2.7-2.1l1.6-6.5A2.8 2.8 0 0 0 17.8 8H14l.5-3.2A2.4 2.4 0 0 0 12.1 2.1L7 10v10Z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              <span>Like</span>
            </button>

            {/* Comment */}
            <button
              type="button"
              aria-label="Comment on post"
              className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-lg px-2 py-2.5 text-sm text-[#c6c6c6] transition hover:bg-white/5 hover:text-white sm:justify-start sm:px-2"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5c-1.2 0-2.34-.28-3.35-.78L5 20l1.78-3.93A7.47 7.47 0 0 1 4.5 11.5 7.5 7.5 0 0 1 12 4a7.5 7.5 0 0 1 8 7.5Z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              <span>Comment</span>
            </button>

            {/* Repost */}
            <button
              type="button"
              aria-label="Repost"
              className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-lg px-2 py-2.5 text-sm text-[#c6c6c6] transition hover:bg-white/5 hover:text-white sm:justify-start sm:px-2"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M17 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />

                <path d="M3 11V9a2 2 0 0 1 2-2h16" strokeLinecap="round" />

                <path d="m7 21-4-4 4-4" strokeLinecap="round" strokeLinejoin="round" />

                <path d="M21 13v2a2 2 0 0 1-2 2H3" strokeLinecap="round" />
              </svg>

              <span>Repost</span>
            </button>

            {/* Share */}
            <button
              type="button"
              aria-label="Share post"
              className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-lg px-2 py-2.5 text-sm text-[#c6c6c6] transition hover:bg-white/5 hover:text-white sm:justify-end sm:px-2"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="m21 3-7.5 18-3.5-7-7-3.5L21 3Z" strokeLinecap="round" strokeLinejoin="round" />

                <path d="M10 14 21 3" strokeLinecap="round" />
              </svg>

              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Comment Input */}
        <CreateComment postId={post.id} queryKey={isSinglePost ? ["getPostComments", post?.id] : ["getPost"]} />

        {/* Comments Section */}
        {post.topComment && (
          <section className="mt-5 bg-[#0f1218] p-4 shadow-[0_12px_35px_rgba(0,0,0,0.12)] sm:p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-[#eeeeee]">Comments</h2>

                <p className="mt-1 text-[10px] text-[#707070]">18 people joined the conversation</p>
              </div>

              <button type="button" className="flex items-center gap-1.5 text-[10px] text-[#858585] transition hover:text-white">
                Most relevant
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="m7 9 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <div className="space-y-5">
              {/* Single comment */}
              {isSinglePost === false && <Comment comment={post.topComment} />}

              {/* All comments */}
              {isSinglePost === true && data?.map((comment) => <Comment comment={comment} key={comment._id} />)}
            </div>

            <button type="button" className="mt-6 w-full rounded-lg border border-[#383838] bg-[#292929] py-2.5 text-xs font-medium text-[#969696] transition hover:border-[#484848] hover:bg-[#303030] hover:text-white">
              View all comments
            </button>
          </section>
        )}
      </article>
    </>
  );
}

export default Post;
