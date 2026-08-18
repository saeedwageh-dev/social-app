export default function ApiError() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0f1218] px-5 py-10 text-white">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-130 w-130 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/[0.07] blur-[140px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-purple-600/4 blur-[100px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-violet-500/4 blur-[110px]"
      />

      <section className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center">
        {/* SquaChat Branding */}
        <div className="mb-12 flex items-center gap-2.5 sm:mb-16">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-violet-500 to-purple-700 shadow-lg shadow-violet-600/20 sm:h-10 sm:w-10">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-4.75 w-4.75 text-white sm:h-5 sm:w-5"
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

          <span className="text-[22px] font-bold tracking-tight sm:text-2xl">
            <span className="text-white">Squa</span>
            <span className="bg-linear-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
              Chat
            </span>
          </span>
        </div>

        {/* HTTP Status Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/6 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-violet-300 shadow-sm shadow-violet-500/5">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.8)]"
          />
          HTTP 404
        </div>

        {/* Error Visual */}
        <div className="relative mb-6 sm:mb-8">
          {/* Decorative message bubbles */}
          <div
            aria-hidden="true"
            className="absolute -left-10 top-7 h-8 w-11 -rotate-12 rounded-lg border border-violet-400/15 bg-violet-500/[0.035] sm:-left-16 sm:top-10 sm:h-10 sm:w-14"
          />

          <div
            aria-hidden="true"
            className="absolute -right-10 bottom-8 h-9 w-12 rotate-12 rounded-lg border border-purple-400/15 bg-purple-500/[0.035] sm:-right-16 sm:bottom-10 sm:h-11 sm:w-16"
          />

          {/* Glow */}
          <div
            aria-hidden="true"
            className="absolute inset-0 scale-75 rounded-full bg-violet-500/15 blur-[55px]"
          />

          <div className="relative flex items-center justify-center">
            <h1 className="bg-linear-to-br from-white via-violet-100 to-violet-500 bg-clip-text text-[7rem] font-black leading-none tracking-[-0.08em] text-transparent drop-shadow-[0_0_30px_rgba(139,92,246,0.18)] sm:text-[9rem] md:text-[10.5rem]">
              404
            </h1>

            {/* Broken chat bubble */}
            <div
              aria-hidden="true"
              className="absolute -bottom-1 right-[6%] flex h-10 w-10 rotate-6 items-center justify-center rounded-xl border border-violet-400/25 bg-[#151923]/90 shadow-lg shadow-violet-600/10 backdrop-blur-sm sm:right-[4%] sm:h-12 sm:w-12"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5 text-violet-400 sm:h-6 sm:w-6"
              >
                <path
                  d="M19 5L5 19"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
                <path
                  d="M19 12C19 15.866 15.866 19 12 19C10.76 19 9.598 18.678 8.602 18.113L5 19L5.88 15.417C5.324 14.416 5 13.251 5 12C5 8.134 8.134 5 12 5C15.866 5 19 8.134 19 12Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Error Content */}
        <div className="max-w-xl">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Resource Not Found
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-400 sm:text-base">
            The resource you&apos;re looking for could not be found. It may
            have been removed, moved, or the URL may be incorrect.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:mt-9 sm:w-auto sm:flex-row">
          <a
            href="/"
            className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-linear-to-r from-violet-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition-all duration-200 hover:brightness-110 hover:shadow-violet-600/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:ring-offset-2 focus:ring-offset-[#0f1218] sm:w-auto"
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

      
        </div>

        {/* Subtle status line */}
        <div className="mt-10 flex items-center gap-2 text-xs text-slate-600">
          <span
            aria-hidden="true"
            className="h-px w-8 bg-slate-800"
          />
          <span>SquaChat</span>
          <span
            aria-hidden="true"
            className="h-px w-8 bg-slate-800"
          />
        </div>
      </section>
    </main>
  );
}