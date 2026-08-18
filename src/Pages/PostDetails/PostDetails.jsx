import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { DotLoader } from "react-spinners";
import ApiError from "../../components/Error/ApiError";
import Post from "../../components/Posts/Post";

export default function PostDetails() {
    const { userToken } = useContext(AuthContext);
   const {id}= useParams()



  function getPostDetails(){
    return axios.get(`https://route-posts.routemisr.com/posts/${id}`,{
      headers:{
        Authorization:`Bearer ${userToken}`
      }
    
    })
  }

const {data,isLoading,isError}=useQuery({
  queryKey:["getSinglePost",id],
  queryFn:getPostDetails,
  select:(data)=>{
return data?.data?.data.post
  }
})
console.log(data)
  const date = new Date(data?.createdAt);
  const formattedDate = date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  if(isLoading){

   return  <div className=" flex min-h-screen ml-72 items-center justify-center bg-[#0f1218]">
    <DotLoader color="#fff" />
  </div>
  } 
  if(isError){
    return <div className="ml-72">
      <ApiError/>
      </div>
  }
  return (
    <main className="h-screen  overflow-x-hidden overflow-y-auto  bg-[#0f1218] text-white ml-72">
      <div className="w-full px-5 py-6 lg:px-8">
        {/* Post */}
      

      <Post post={data} isSinglePost = {true}/>

      </div>
    </main>
  );
}
