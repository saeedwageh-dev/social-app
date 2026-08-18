import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

function Layout (){
  return (
    <div className="h-screen w-full overflow-hidden bg-[#1b1b1b] text-white">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Fixed Right Sidebar */}
     <Outlet/>
    </div>
  );
};
export default Layout