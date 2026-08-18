function Comment({ comment }) {
  // console.log(comment);
  const date = new Date(comment?.createdAt);
  const formattedDate = date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  //   console.log(comment)
  return (
    <div className="flex gap-3">
      <img src={comment?.commentCreator.photo} alt="John Doe" className="h-9 w-9 shrink-0 rounded-full object-cover ring-1 ring-[#414141]" />

      <div className="min-w-0 flex-1">
        <div className="rounded-xl bg-[#3431315f] px-3.5 py-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[#e2e2e2]">{comment?.commentCreator.name}</span>

            <span className="text-[10px] text-[#656565]">{formattedDate}</span>
          </div>

          <p className="mt-1.5 text-xs leading-5 text-[#b3b3b3]">{comment?.content}</p>
        </div>
        {comment?.image && (
          <div className="mt-2 w-28 overflow-hidden rounded-lg">
            <img src={comment.image} alt="Comment attachment" className="block h-20 w-full object-cover" />
          </div>
        )}

        <div className="mt-2 flex items-center gap-4 px-2 text-[10px] text-[#737373]">
          <button type="button" className="transition hover:text-[#8a96ff]">
            Like
          </button>

          <button type="button" className="transition hover:text-[#8a96ff]">
            Reply
          </button>

          <span>12 likes</span>
        </div>
      </div>
    </div>
  );
}

export default Comment;
