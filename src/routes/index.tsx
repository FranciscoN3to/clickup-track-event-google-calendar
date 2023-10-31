import { Routes, Route } from 'react-router-dom';
import Home from '@pages/Home';
import Layout from '@components/Layout';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/authorization'  />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
