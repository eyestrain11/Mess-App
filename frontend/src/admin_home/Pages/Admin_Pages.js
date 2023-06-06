
import React from 'react';
import { useParams } from 'react-router-dom';
import AddMenu from '../Components/Menu';
import AddUser from '../Components/Adduser';
import AllUser from '../Components/Alluser';
import AdminHome from '../Components/Home';
import Sidebar from '../Components/Sidebar';
import Mainbar from '../Components/Mainbar';
import TodayStudent from '../Components/TodayStudent';

function Admin_Pages() {
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
                case "menu": return (<AddMenu /> );
                case "home": return (<AdminHome />);
                case "adduser": return (<AddUser /> );
                case "alluser": return (<AllUser /> );
                case "todaystudent":return (<TodayStudent/>)
                default: return "#FFFFFF";
            }
          })()}
        </div>
      </main>
    </div>
  );
}

export default Admin_Pages;