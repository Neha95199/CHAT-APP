import React, { useState } from "react";
// import { useAuth } from "../Context/AuthContext";
import Sidebar from "./components/Sidebar";
import MsgContainer from "./components/MsgContainer";

const Home = () => {
  const[ selectedUser , setSelectedUser] = useState(null);
  const[ isSidebarVisible , setIsSidebarVisible] = useState(true);

  const handleUserSelect=(user)=>{
   setSelectedUser(user)
   setIsSidebarVisible(false)
  }
  const handleShowSidebar = ()=>{
   setIsSidebarVisible(true)
   setSelectedUser(null)
  }
  return (
    <div className="flex justify-between min-w-full md:min-w-[750px] md:max-w-[75%] px-2 h-[95%] md:h-full rounded-x1 shadow-lg bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <div className={`w-full py-2 md:flex ${isSidebarVisible ? '' : 'hidden'}`}>
        <Sidebar onSelectUser={handleUserSelect}/>
      </div>
      <div className={`divider divider-horizontal px-3 md:flex 
        ${isSidebarVisible ? '' : 'hidden'} ${selectedUser ? 'block' :'hidden'}`}></div>
      <div className={`flex-auto ${selectedUser ? '' : 'hidden md:flex'} bg-grey-200}`}>
        <MsgContainer onBackUser={handleShowSidebar} />
      </div>
    </div>
  );
};

export default Home;
