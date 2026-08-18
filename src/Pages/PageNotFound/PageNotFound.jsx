export default function PageNotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0f1218] px-5 py-10 text-white">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-105 w-105 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[120px]" />

      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center">
        {/* SquaChat Logo */}
        <div className="mb-14 flex items-center gap-2.5">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-violet-500 to-purple-700 shadow-lg shadow-violet-500/20">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5 text-white"
              aria-hidden="true"
            >
              <path
                d="M20 11.5C20 15.6421 16.4183 19 12 19C10.7685 19 9.60132 18.7398 8.56613 18.2757L4 20L5.26983 16.4742C4.47112 15.1459 4 13.5988 4 11.5C4 7.35786 7.58172 4 12 4C16.4183 4 20 7.35786 20 11.5Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.5 11.5H8.51M12 11.5H12.01M15.5 11.5H15.51"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <span className="text-2xl font-bold tracking-tight">
            Squa
            <span className="bg-linear-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
              Chat
            </span>
          </span>
        </div>

        {/* 404 Visual */}
        <div className="relative mb-8">
          {/* Decorative chat bubbles */}
          <div className="absolute -left-8 top-5 h-9 w-12 rotate-[-14deg] rounded-xl border border-violet-400/20 bg-violet-500/5 blur-[0.2px]" />
          <div className="absolute -right-9 bottom-5 h-10 w-14 rotate-12 rounded-xl border border-purple-400/20 bg-purple-500/5" />

          {/* Main glow */}
          <div className="absolute inset-0 scale-75 rounded-full bg-violet-500/20 blur-3xl" />

          <h1 className="relative bg-linear-to-br from-white via-violet-100 to-violet-500 bg-clip-text text-[7rem] font-black leading-none tracking-[-0.07em] text-transparent drop-shadow-[0_0_35px_rgba(139,92,246,0.2)] sm:text-[9rem] md:text-[11rem]">
            404
          </h1>
        </div>

        {/* Content */}
        <div className="max-w-lg">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Page not found
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
            The page you&apos;re looking for doesn&apos;t exist or may have
            been moved.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col items-center gap-4 sm:mt-9">
          <a
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-linear-to-r from-violet-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition-all duration-200 hover:brightness-110 hover:shadow-violet-600/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:ring-offset-2 focus:ring-offset-[#0f1218]"
          >
            Back to Home
            <svg
              viewBox="0 0 20 20"
              fill="none"
              className="ml-2 h-4 w-4"
              aria-hidden="true"
            >
              <path
                d="M4 10H16M11 5L16 10L11 15"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          <a
            href="#"
            className="text-sm font-medium text-slate-500 transition-colors hover:text-violet-400"
          >
            Go back
          </a>
        </div>
      </div>
    </main>
  );
}