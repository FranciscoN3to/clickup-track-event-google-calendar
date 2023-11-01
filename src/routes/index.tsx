import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Home from '@pages/Home';
import Layout from '@components/Layout';
import { useEffect } from 'react';

function AuthorizationComponent () {
  const { hash } = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    const params = new URLSearchParams(hash)
    const googleToken = params.get('access_token')
    localStorage.setItem('google-token', googleToken || '')
    navigate('/')
  }, [hash, navigate])
  
  return <div/>
}


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/authorization' element={<AuthorizationComponent />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
