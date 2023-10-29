import { Outlet } from 'react-router-dom';
import Body from './Body';
import Header from './Header';

function Layout() {
  return (
    <div className="bg-white">
      <Header />
      <Body>
        <Outlet />
      </Body>
    </div>
  );
}

export default Layout;
