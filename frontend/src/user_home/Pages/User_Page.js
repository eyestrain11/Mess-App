import React from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from "../Components/Sidebar";
import UserProfile from './UserProfile';
import UserMenu from './UserMenu';

function User_Page() {
  const { id } = useParams();
  return (
    <div >
      <main main className="flex bg-slate-100">
        <div className="shadow-2xl  flex-[2] ">
          <Sidebar />
        </div>

        <div className="mx-3 flex-[9]">
          {/* <Mainbar /> */}
          {(() => {
            switch (id) {
                case "profile": return (<UserProfile></UserProfile>);
                case "menu": return (<UserMenu></UserMenu>);
                default: return "#FFFFFF";
            }
          })()}
        </div>
      </main>
    </div>
  );
}

export default User_Page;
