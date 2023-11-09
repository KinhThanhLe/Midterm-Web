import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/Landing/LandingPage';
import LoginPage from './pages/Login/LoginPage';
import SignupPage from './pages/Signup/SignupPage';
import Footer from './components/common/Footer';
import ProfilePage from './pages/Profile/ProfilePage';
import Header from './components/common/Header';

const lightHeaderPaths = ["/profile"]
const isNoHeaderFooterPaths = ["/sign-in", "/sign-up"]

function App() {
  const location = useLocation();
  const isLightHeader = lightHeaderPaths.includes(location.pathname);
  const isNoHeader = isNoHeaderFooterPaths.includes(location.pathname);

  return (
    <>
      {!isNoHeader && <Header isLight={isLightHeader}></Header>}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-in" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      {!isNoHeader && <Footer></Footer>}
    </>
  );
}

export default App;
