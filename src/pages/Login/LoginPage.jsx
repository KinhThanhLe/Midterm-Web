import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import axios from "axios";
import classNames from 'classnames';

function LoginPage() {
  const { token, login, logout } = useAuth();
  const navigate = useNavigate()
  const [state, setState] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (userName, passWord) => {
    try {
      setIsLoading(true);

      const response = await axios.post('https://be-midterm-web.vercel.app/user/login', {
        username: userName,
        password: passWord,
      });
      const receivedToken = response.data;
      localStorage.setItem('token', receivedToken.data);
      login(receivedToken);

      setTimeout(() => {
        setIsLoading(false);
        navigate('/profile');
      }, 2000);
    } catch (error) {
      setIsLoading(false);

      setError("Username or password incorrect!");
    }
  };



  function hanldeInputChange(event) {
    const field = event.target.name;
    setState({
      ...state,
      [field]: event.target.value
    });
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    if (state.username === "" || state.password === "") {
      setError("Please fill in both username and password");
    } else {
      setError("");
      // Pass the history object to handleLogin
      handleLogin(state.username, state.password);
    }
  }


  return (
    <div className="min-h-screen bg-deep-purple-900 py-20">
      <div className="w-4/12 bg-white rounded-xl p-12 mx-auto">
        <form
          action="/"
          method="post"
          onSubmit={(event) => handleFormSubmit(event)}
        >
          <h1 className="text-center font-extrabold text-3xl mt-5 mb-10 text-blue-gray-800">
            Sign in
          </h1>
          {error && (
            <h6 className="text-red-600 italic text-sm mb-4">{error}</h6>
          )}
          <div className="flex flex-col gap-10">
            <Input
              name="username"
              variant="standard"
              label="Username"
              onChange={(event) => hanldeInputChange(event)}
            ></Input>
            <Input
              name="password"
              variant="standard"
              label="Password"
              type="password"
              onChange={(event) => hanldeInputChange(event)}
            ></Input>
            <Button
              className={classNames(
                "w-full text-center p-3 bg-blue-400 text-sm rounded-md font-semibold",
                { 'opacity-50 cursor-not-allowed': isLoading }
              )}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <span className="mr-2">Loading...</span>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-900"></div>
                </div>
              ) : (
                'CONTINUE'
              )}
            </Button>
          </div>
        </form>
        <div className="mt-10 flex gap-2 items-center">
          <h1 className="text-sm text-gray-700">
            Did not have an account yet?
          </h1>
          <Link to="/sign-up">
            <h6
              className="font-semibold text-sm text-deep-purple-900 hover:text-deep-purple-400"
              href="#"
            >
              Create now
            </h6>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
