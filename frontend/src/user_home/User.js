import Sidebar from "./Sidebar";
import Mainbar from "./Mainbar";
import UserMenu from '../menu/UserMenu';

function User() {
  return (
    <div >
      <main main className="flex bg-slate-100">
        <div className="shadow-2xl  flex-[2] ">
          <Sidebar />
        </div>

        <div className="mx-3 flex-[9]">
          <Mainbar />
          <UserMenu></UserMenu>
        </div>
      </main>
    </div>
  );
}

export default User;
