import CreatePost from "../../components/Posts/CreatePosts";
import Post from "../../components/Posts/Post";
import Stories from "../../components/Stories/Stories";
import RightSidebar from "../../components/RightSidebar.jsx/RightSidebar";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { DotLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";
import ApiError from "../../components/Error/ApiError";
function Home() {
  const { userToken } = useContext(AuthContext);
 
  function getAllPosts() {
    return axios.get("https://route-posts.routemisr.com/posts", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      params: {
        sort: "-createdAt",
      },
    });
  }
 const{data,isLoading,isError,error}= useQuery({
    queryKey: ["getPost"],
    queryFn: getAllPosts,
    select:(data)=>{
return data?.data.data.posts
    }
    
  });
 
  return (
    <>
      <div className="fixed inset-y-0 right-0 z-40 hidden h-full lg:block lg:w-72 2xl:w-80 bg-[#0f1218]">
        <RightSidebar />
      </div>

      <main className="h-screen min-w-0 overflow-hidden bg-[#0f1218] md:ml-64 lg:ml-72 lg:mr-72 2xl:mr-80">
        <div className="h-full overflow-y-auto overflow-x-hidden scrollbar-track-[#1b1b1b] scrollbar-thumb-[#2f2f2f] scrollbar-thumb-rounded-full scrollbar-thin">
          <Stories />

          <div className="w-full space-y-4 px-3 py-4 sm:px-5 md:px-6">
            <CreatePost />
           {isLoading ? (
  <div className="flex min-h-[70vh] w-full items-center justify-center">
    <DotLoader color="#fff" />
  </div>
) : isError ? (
 <ApiError/>
) : (
  data?.map((post) => (
    <Post post={post} key={post.id} isSinglePost={false} />
  ))
)}
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
