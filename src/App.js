import { Routes, Route } from 'react-router-dom'

import LandingPage from "./pages/landingpage";
import SigninPage from "./pages/signinpage";
import SignupPage from "./pages/signuppage";
import HomePage from "./pages/homepage";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';


function App() {

  return (



    <>
      <Routes>
        <Route path='/*' element={<LandingPage />} />
        <Route path='/signin/*' element={<SigninPage />} />
        <Route path='/signup/*' element={<SignupPage />} />
        <Route path='/home/*' element={<HomePage />} />

      </Routes>
    </>
  );
}

export default App;
