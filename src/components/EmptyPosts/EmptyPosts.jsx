import { FileText, Plus } from "lucide-react";
import { Link } from "react-router-dom";

function EmptyPosts( ) {
  return (
    <div className="flex min-h-80 w-full items-center justify-center px-4 py-12">
      <div className="flex max-w-md flex-col items-center text-center">
        {/* Icon */}
        <div
          className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl
                     border border-slate-700/60 bg-slate-800/40
                     text-blue-400/80"
        >
          <FileText
            size={28}
            strokeWidth={1.7}
            aria-hidden="true"
          />
        </div>

        {/* Heading */}
        <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
          No posts yet
        </h2>

        {/* Description */}
        <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400 sm:text-[15px]">
             When you share your first post, it will appear here.
        </p>

        {/* CTA — Own profile only */}
   
          <Link to={"/"}
            type="button"
            className="mt-7 inline-flex items-center gap-2.5 rounded-xl
                       bg-blue-600 px-5 py-3 text-sm font-semibold text-white
                       shadow-sm transition-all duration-200
                       hover:bg-blue-500 hover:shadow-md
                       focus:outline-none focus:ring-2 focus:ring-blue-500/60
                       focus:ring-offset-2 focus:ring-offset-[#0d1016]
                       active:scale-[0.98]"
          >
            <Plus
              size={18}
              strokeWidth={2.2}
              aria-hidden="true"
            />

            <span>Create your first post</span>
          </Link>
        
      </div>
    </div>
  );
}

export default EmptyPosts;