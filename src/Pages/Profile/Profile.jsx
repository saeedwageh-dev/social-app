import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Post from "../../components/Posts/Post";
import EmptyPosts from "../../components/EmptyPosts/EmptyPosts";

export default function Profile() {
  const { userData, userToken } = useContext(AuthContext);

  function getProfilePosts() {
    return axios.get(`https://route-posts.routemisr.com/users/${userData?._id}/posts`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }
  const { data } = useQuery({
    queryKey: ["getProfilePosts"],
    queryFn: getProfilePosts,
    select: (data) => {
      return data?.data?.data?.posts;
    },
  });
  console.log(data);

  return (
    <main className="h-screen  overflow-x-hidden overflow-y-auto  bg-[#0f1218] text-white ml-72">
      <div className="w-full px-5 py-6 lg:px-8">
        {/* Profile Cover + Header */}
        <section className="overflow-hidden rounded-2xl border border-white/8 bg-[#0f1218] shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
          {/* Cover */}
          <div className="relative h-44 w-full overflow-hidden sm:h-56 md:h-64 lg:h-72">
            <img src="https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=2200&q=85" alt="Profile cover" className="h-full w-full object-cover" />

            <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/10 to-[#151619]" />
          </div>

          {/* Profile Information */}
          <div className="relative px-4 pb-5 sm:px-6 md:px-8 lg:px-10">
            {/* Avatar */}
            <div className="-mt-16 flex flex-col gap-5 sm:-mt-20 md:-mt-24 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
                <div className="relative w-fit shrink-0">
                  <div className="rounded-full bg-linear-to-br from-[#8b5cf6] via-[#6366f1] to-[#ec4899] p-0.75 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
                    <div className="rounded-full bg-[#151619] p-0.75">
                      <img src={userData?.photo} alt="Keisha Harrison" className="h-28 w-28 rounded-full object-cover sm:h-36 sm:w-36 md:h-40 md:w-40" />
                    </div>
                  </div>

                  <span className="absolute bottom-3 right-3 h-5 w-5 rounded-full border-4 border-[#151619] bg-emerald-500 sm:bottom-4 sm:right-4" />
                </div>

                <div className="pb-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{userData?.name}</h1>

                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#635bff] shadow-[0_0_12px_rgba(99,91,255,0.35)]">
                      <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                        <path
                          d="M12 2.8l2.15 1.2 2.45-.1 1.25 2.1 2.1 1.25-.1 2.45L21.2 12l-1.2 2.15.1 2.45-2.1 1.25-1.25 2.1-2.45-.1L12 21.2l-2.15-1.2-2.45.1-1.25-2.1-2.1-1.25.1-2.45L2.8 12 4 9.85 3.9 7.4 6 6.15 7.25 4.05l2.45.1L12 2.8Z"
                          fill="currentColor"
                          className="text-[#635bff]"
                        />
                        <path d="m8.7 12.2 2.05 2.05 4.6-4.6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-gray-400 sm:text-base">@{userData?.email.split("@")[0]}</p>

                  <p className="mt-2 text-sm text-gray-300 sm:text-base">
                    Artist <span className="text-gray-600">|</span> Dreamer <span className="text-gray-600">|</span> Creator 🎨
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-5 sm:gap-7">
                    <div>
                      <p className="text-lg font-semibold text-white">128</p>
                      <p className="text-xs text-gray-500 sm:text-sm">Posts</p>
                    </div>

                    <div className="h-8 w-px bg-white/8" />

                    <div>
                      <p className="text-lg font-semibold text-white">2.4K</p>
                      <p className="text-xs text-gray-500 sm:text-sm">Followers</p>
                    </div>

                    <div className="h-8 w-px bg-white/8" />

                    <div>
                      <p className="text-lg font-semibold text-white">340</p>
                      <p className="text-xs text-gray-500 sm:text-sm">Following</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex w-full items-center gap-2 lg:w-auto">
                <button
                  type="button"
                  className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#1b1c20] px-4 text-sm font-medium text-white transition-all duration-200 hover:border-white/18 hover:bg-[#222329] focus:outline-none focus:ring-2 focus:ring-[#635bff]/50 active:scale-[0.98] sm:flex-none"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                    <path
                      d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5c-1.25 0-2.43-.3-3.47-.84L4 20l1.84-4.35A7.47 7.47 0 0 1 5 11.5 7.5 7.5 0 1 1 20 11.5Z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M9 11.5h6M12 8.5v6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                  </svg>
                  Message
                </button>

                <button
                  type="button"
                  className="h-11 flex-1 rounded-xl bg-linear-to-r from-[#635bff] to-[#5747e8] px-6 text-sm font-semibold text-white shadow-[0_8px_25px_rgba(99,91,255,0.2)] transition-all duration-200 hover:from-[#7069ff] hover:to-[#6252f2] focus:outline-none focus:ring-2 focus:ring-[#635bff]/60 active:scale-[0.98] sm:flex-none"
                >
                  Follow
                </button>

                <button
                  type="button"
                  aria-label="More options"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#1b1c20] text-gray-300 transition-all duration-200 hover:border-white/18 hover:bg-[#222329] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#635bff]/50 active:scale-[0.96]"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                    <circle cx="5" cy="12" r="1.5" fill="currentColor" />
                    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                    <circle cx="19" cy="12" r="1.5" fill="currentColor" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="mt-3 overflow-hidden rounded-2xl border border-white/8 bg-[#0f1218]">
          <div className="overflow-x-auto scrollbar-thin scrollbar-track-[#151619] scrollbar-thumb-[#2b2c31]">
            <div className="flex min-w-max border-b border-white/[0.07] px-3 sm:px-5 md:px-8">
              <button type="button" className="relative min-w-22.5 px-5 py-5 text-sm font-medium text-white transition-colors duration-200 sm:min-w-30 sm:text-base">
                Posts
                <span className="absolute -bottom-px left-1/2 h-0.75 w-20 -translate-x-1/2 rounded-full bg-linear-to-r from-[#8b5cf6] to-[#5b5bf7]" />
              </button>

              <button type="button" className="min-w-22.5 px-5 py-5 text-sm font-medium text-gray-500 transition-colors duration-200 hover:text-gray-200 sm:min-w-30 sm:text-base">
                About
              </button>

              <button type="button" className="min-w-22.5 px-5 py-5 text-sm font-medium text-gray-500 transition-colors duration-200 hover:text-gray-200 sm:min-w-30 sm:text-base">
                Photos
              </button>

              <button type="button" className="min-w-22.5 px-5 py-5 text-sm font-medium text-gray-500 transition-colors duration-200 hover:text-gray-200 sm:min-w-30 sm:text-base">
                Videos
              </button>

              <button type="button" className="min-w-22.5 px-5 py-5 text-sm font-medium text-gray-500 transition-colors duration-200 hover:text-gray-200 sm:min-w-30 sm:text-base">
                Saved
              </button>

              <button type="button" className="min-w-22.5 px-5 py-5 text-sm font-medium text-gray-500 transition-colors duration-200 hover:text-gray-200 sm:min-w-30 sm:text-base">
                Tagged
              </button>
            </div>
          </div>

          {/* Posts Grid */}
          {/* <div className="p-3 sm:p-5 md:p-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-1">
              {data?.map((post) => (
                <Post post={post} key={post?._id}/>
              ))}
            </div>
          </div> */}

          <div className="p-3 sm:p-5 md:p-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-1">
              {data?.length > 0 ? data?.map((post) => <Post key={post._id} post={post} />) : <EmptyPosts />}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
