import { Outlet } from "react-router-dom";
import Body from "./Body";

function Layout() {
  return (
    <div className="bg-white">
      <Body>
        <Outlet />
      </Body>
    </div>
  );
}

export default Layout;
