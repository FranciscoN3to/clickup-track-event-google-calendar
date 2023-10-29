import { Routes, Route } from 'react-router-dom';
import Home from '@pages/Home';
import Layout from '@components/Layout';
import Login from '@pages/Login';
import Body from '@components/Layout/Body';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Body><Login /></Body>}/> 
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/authorization'  />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
