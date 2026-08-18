import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function CreateComment({ postId, queryKey }) {
  // console.log(postId)
  const { userToken ,userData} = useContext(AuthContext);
  const query = useQueryClient();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      content: "",
      image: "",
    },
  });

  function createCommentFunc() {
    return axios.post(`https://route-posts.routemisr.com/posts/${postId}/comments`, formData, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
  }

  const { data, isPending, error, isError, mutate } = useMutation({
    mutationFn: createCommentFunc,

    onSuccess: () => {
      console.log("comment Created Successfully");
      reset();
      query.invalidateQueries({ queryKey: queryKey });
    },
    onError: (error) => {
      console.log("cannot Create Comment");
    },
  });

  // console.log(data);

  let formData = new FormData();
  function handleCreateComment(data) {
    console.log("create Comment", data.image[0]);
    // call api
    if (!data.content && !data.image[0]) return;

    if (data.content) {
      formData.append("content", data.content);
    }

    if (data.image[0]) {
      formData.append("image", data.image[0]);
    }

    console.log(formData);

    // call api
    mutate();
  }
  return (
    <div className="px-4 pb-4 pt-1 sm:px-5 sm:pb-5 mb">
      <div className="flex items-center gap-2">
        <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full border border-white/8 bg-[#3a3a3a]">
          <img src={userData?.photo} alt="Your profile" className="h-full w-full object-cover" />
        </div>

        <form onSubmit={handleSubmit(handleCreateComment)} className="flex h-10 min-w-0 flex-1 items-center rounded-lg bg-[#1e2023ef] px-3">
          <input {...register("content")} type="text" placeholder="Add a comment" aria-label="Add a comment" className="min-w-0 flex-1 bg-transparent text-sm text-white  outline-none placeholder:text-[#808080]" />

          <div className="flex shrink-0 items-center gap-1">
            <button type="button" aria-label="Add emoji" className="flex h-7 w-7 items-center justify-center rounded-md text-[#999] transition hover:bg-white/6 hover:text-white">
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.7">
                <circle cx="12" cy="12" r="8.5" />
                <circle cx="9" cy="10" r="0.8" fill="currentColor" stroke="none" />
                <circle cx="15" cy="10" r="0.8" fill="currentColor" stroke="none" />
                <path d="M8.5 14c1.8 1.8 5.2 1.8 7 0" strokeLinecap="round" />
              </svg>
            </button>

            <label htmlFor="image" type="button" aria-label="Add image" className="cursor-pointer flex h-7 w-7 items-center justify-center rounded-md text-[#999] transition hover:bg-white/6 hover:text-white">
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.7">
                <rect x="3.5" y="4" width="17" height="16" rx="2" />
                <circle cx="8.5" cy="9" r="1.3" />
                <path d="m4.5 17 4.5-4.5 3.2 3 2.3-2.3 4.5 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </label>
            <input {...register("image")} type="file" id="image" hidden />
          </div>
          <button
            type="submit"
            disabled={isPending}
            aria-label="Send comment"
            className="cursor-pointer flex h-7 ml-2 items-center justify-center rounded-md bg-[#7c3aed] px-3 text-xs font-medium text-white transition hover:bg-[#6d28d9] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? (
              "..."
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 rotate-150 mt-0.5 mr-0.5 ">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
              </svg>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateComment;
