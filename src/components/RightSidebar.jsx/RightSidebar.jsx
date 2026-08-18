import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

function RightSidebar() {
 const {userData} =useContext(AuthContext)
  const suggestions = [
    {
      username: "James Wilson",
      handle: "@jameswilson",
      image: "https://i.pravatar.cc/100?img=12",
      followed: false,
    },
    {
      username: "Olivia Smith",
      handle: "@oliviasmith",
      image: "https://i.pravatar.cc/100?img=44",
      followed: false,
    },
    {
      username: "Daniel Brown",
      handle: "@danielbrown",
      image: "https://i.pravatar.cc/100?img=33",
      followed: true,
    },
  ];

  const groups = [
    {
      name: "Creative Minds",
      members: "12.4K members",
      image: "https://i.pravatar.cc/100?img=58",
    },
    {
      name: "Photography Lovers",
      members: "8.7K members",
      image: "https://i.pravatar.cc/100?img=25",
    },
    {
      name: "Tech Community",
      members: "6.2K members",
      image: "https://i.pravatar.cc/100?img=60",
    },
  ];

  return (
    <aside className=" hidden xl:flex w-70 2xl:w-75 shrink-0 min-h-screen flex-col bg-[#0f1218] px-4 py-5 border-l border-white/6 text-white">
     {/* profile */}
 <div className="flex items-center gap-3 px-2 py-1 mb-auto">
            <div className="relative shrink-0">
              <img src={userData?.photo} alt="Victor Emokpare" className="h-11 w-11 rounded-full object-cover ring-1 ring-white/10" />

              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#08090D] bg-[#22C55E]" />
            </div>

            <div className="min-w-0">
              <p className="truncate text-[14px] font-semibold text-[#F5F5F7]">{userData?.name}</p>

              <p className="mt-0.5 truncate text-[13px] font-medium text-[#9A9CA8]">@{userData?.email.split("@")[0]}</p>
            </div>

            <button
              type="button"
              aria-label="More options"
              className="ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[#9A9CA8] transition-all duration-200 hover:bg-[#151721] hover:text-[#F5F5F7]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <circle cx="12" cy="5" r="1.5" />
                <circle cx="12" cy="12" r="1.5" />
                <circle cx="12" cy="19" r="1.5" />
              </svg>
            </button>
          </div>
      {/* Search */}
      <div className="relative ">
        <svg
          viewBox="0 0 24 24"
          className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-[#858585]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <circle cx="10.8" cy="10.8" r="6.8" />
          <path d="m16 16 4.2 4.2" strokeLinecap="round" />
        </svg>

        <input
          type="text"
          placeholder="Search SquaChat"
          aria-label="Search SquaChat"
          className="h-10 w-full rounded-full border border-white/6 bg-[#1e2023ef] pl-10 pr-4 text-sm text-white outline-none placeholder:text-[#777] transition focus:border-[#6961df]/60"
        />
      </div>

      {/* Suggestions */}
      <section className="mt-7">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">Suggestions for you</h2>

          <button type="button" className="text-xs font-medium text-[#7c74e9] transition hover:text-[#9a94ff]">
            See All
          </button>
        </div>

        <div className="space-y-1">
          {suggestions.map((user) => (
            <div key={user.username} className="flex items-center gap-3 rounded-xl px-2 py-2.5 transition hover:bg-white/3">
              <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full border border-white/8 bg-[#363636]">
                <img src={user.image} alt={user.username} className="h-full w-full object-cover" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-white">{user.username}</p>
                <p className="mt-0.5 truncate text-[10px] text-[#7f7f7f]">{user.handle}</p>
              </div>

              <button
                type="button"
                className={`shrink-0 rounded-lg px-3 py-1.5 text-[10px] font-medium transition ${
                  user.followed
                    ? "border border-white/8 bg-transparent text-[#a7a7a7] hover:bg-white/5 hover:text-white"
                    : "bg-[#6c63e8] text-white hover:bg-[#7b73ef]"
                }`}
              >
                {user.followed ? "Followed" : "Follow"}
              </button>
            </div>
          ))}
        </div>
      </section>

      <div className="my-6 h-px bg-white/6" />

      {/* Suggested Groups */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">Suggested Groups</h2>

          <button type="button" className="text-xs font-medium text-[#7c74e9] transition hover:text-[#9a94ff]">
            See All
          </button>
        </div>

        <div className="space-y-1">
          {groups.map((group) => (
            <div key={group.name} className="flex items-center gap-3 rounded-xl px-2 py-2.5 transition hover:bg-white/3">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-white/8 bg-[#363636]">
                <img src={group.image} alt={group.name} className="h-full w-full object-cover" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-white">{group.name}</p>
                <p className="mt-0.5 truncate text-[10px] text-[#7f7f7f]">{group.members}</p>
              </div>

              <button
                type="button"
                className="shrink-0 rounded-lg border border-[#5e57c9] bg-transparent px-3 py-1.5 text-[10px] font-medium text-[#8c85f2] transition hover:bg-[#6c63e8] hover:text-white"
              >
                Join
              </button>
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
}

export default RightSidebar;
