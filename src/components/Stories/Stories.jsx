import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import StoryItem from "./StoryItem";

function Stories() {
  


const{data}=useQuery({
    queryKey: ["stories"],
    queryFn: async () => {
      const response = await axios("https://randomuser.me/api/?results=10");
      return response.data
    },
    select:(data)=>data?.results
  });

  return (
    <section className="w-full bg-[#0f1218] border-b border-white/6 overflow-hidden">
      <div className="w-full overflow-x-auto scrollbar-hide">
        <div className="flex justify-center items-start gap-5 px-4 py-3 min-w-max md:gap-6 md:px-5">
        {data?.map((story, index) => (
            <div
              key={index}
            >
              <StoryItem story={story} index={index}/>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stories;