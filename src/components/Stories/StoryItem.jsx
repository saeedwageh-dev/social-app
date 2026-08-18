function StoryItem({story,index}) {
      const gradients = [
    {

      gradient: "from-purple-500 via-pink-400 to-cyan-400",
    },
    {

      gradient: "from-pink-500 via-purple-400 to-orange-300",
    },
    {
      
      gradient: "from-cyan-400 via-purple-500 to-pink-400",
    },
    {

      gradient: "from-pink-400 via-orange-400 to-purple-500",
    },
    {

      gradient: "from-purple-500 via-pink-400 to-cyan-400",
    },
    {

      gradient: "from-cyan-400 via-purple-500 to-pink-400",
    },
    {

      gradient: "from-purple-400 via-pink-400 to-orange-300",
    },
    {
  
      gradient: "from-cyan-400 via-blue-500 to-purple-500",
    },
     {
      
      gradient: "from-cyan-400 via-purple-500 to-pink-400",
    },
     {

      gradient: "from-purple-500 via-pink-400 to-cyan-400",
    },
  ];
  const gradient = gradients[index %gradients.length]
    return (
       <div  className="w-14 sm:w-15.5 shrink-0 flex flex-col items-center">
              <div
                className={`w-13 h-13 sm:w-14.5 sm:h-14.5 rounded-full p-0.5 bg-linear-to-tr ${gradient.gradient} shadow-[0_0_12px_rgba(139,92,246,0.15)]}`}
              >
                <div className="w-full h-full rounded-full p-0.5 bg-[#242424]">
                  <img src={story.picture.medium} alt={story.name.first} className="w-full h-full rounded-full object-cover" />
                </div>
              </div>
              <span className="mt-1.5 w-full text-center text-[10px] sm:text-[11px] leading-4 text-[#bdbdbd] truncate"> {story.name.first}</span>
            </div>
    )
}

export default StoryItem
