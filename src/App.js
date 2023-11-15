import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/Landing/LandingPage';
import LoginPage from './pages/Login/LoginPage';
import SignupPage from './pages/Signup/SignupPage';
import Footer from './components/common/Footer';
import ProfilePage from './pages/Profile/ProfilePage';
import Header from './components/common/Header';
import HomePage from './pages/Home/Home';

const lightHeaderPaths = ["/profile", "/home"]
const isNoHeaderFooterPaths = ["/sign-in", "/sign-up"]


function App() {
  const location = useLocation();
  const isLightHeader = lightHeaderPaths.includes(location.pathname);
  const isNoHeader = isNoHeaderFooterPaths.includes(location.pathname);
  const isLoggedIn = localStorage.getItem('token');

  return (
    <>
      {!isNoHeader && <Header isLight={isLightHeader}></Header>}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/sign-in" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path='/profile' element={isLoggedIn ? <ProfilePage /> : <LandingPage />} />
      </Routes>
      {!isNoHeader && <Footer></Footer>}
    </>
  );
}

export default App;
