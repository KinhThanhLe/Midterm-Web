import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import classNames from "classnames";

function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);

  const [state, setState] = useState({
    full_name: "",
    phone_number: "",
    email: "",
    birthday: "",
    address: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleRegister = async (
    userName,
    passWord,
    fullName,
    birthDay,
    addDress,
    email,
    phoneNumber
  ) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://be-midterm-web.vercel.app/user/register",
        {
          username: userName,
          password: passWord,
          full_name: fullName,
          birthday: birthDay,
          address: addDress,
          email: email,
          phone_number: phoneNumber,
          image: {
            url: "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
          },
        }
      );

      setTimeout(() => {
        setIsLoading(false);
        navigate("/sign-in");
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
      [field]: event.target.value,
    });
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    if (
      state.username === "" ||
      state.password === "" ||
      state.address === "" ||
      state.birthday === "" ||
      state.email === "" ||
      state.full_name === "" ||
      state.phone_number === ""
    ) {
      setError("Please fill in all field");
    } else {
      setError("");
      // Pass the history object to handleLogin
      handleRegister(
        state.username,
        state.password,
        state.full_name,
        state.birthday,
        state.address,
        state.email,
        state.phone_number
      );
    }
  }

  return (
    <div className="min-h-screen bg-deep-purple-900 flex justify-center items-center">
      <div className="w-4/12 bg-white rounded-xl p-12 my-20">
        <form
          action="/"
          method="post"
          onSubmit={(event) => handleFormSubmit(event)}
        >
          <h1 className="text-center font-extrabold text-3xl mt-5 mb-10 text-blue-gray-800">
            Sign up
          </h1>
          {error && (
            <h6 className="text-red-600 italic text-sm mb-4">{error}</h6>
          )}
          <div className="flex flex-col gap-10">
            <Input
              name="full_name"
              variant="standard"
              label="Full name"
              onChange={(event) => hanldeInputChange(event)}
            ></Input>
            <Input
              name="birthday"
              variant="standard"
              label="Date of birth"
              onChange={(event) => hanldeInputChange(event)}
              type="date"
            ></Input>
            <Input
              name="email"
              variant="standard"
              label="Email"
              onChange={(event) => hanldeInputChange(event)}
            ></Input>
            <Input
              name="phone_number"
              variant="standard"
              label="Phone number"
              onChange={(event) => hanldeInputChange(event)}
            ></Input>
            <Input
              name="address"
              variant="standard"
              label="Address"
              onChange={(event) => hanldeInputChange(event)}
            ></Input>
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
                { "opacity-50 cursor-not-allowed": isLoading }
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
                "CONTINUE"
              )}
            </Button>
          </div>
        </form>
        <div className="mt-10 flex gap-2 items-center">
          <h1 className="text-sm text-gray-700">Already have an account?</h1>
          <Link to="/sign-in">
            <h6
              className="font-semibold text-sm text-deep-purple-900 hover:text-deep-purple-400"
              href="#"
            >
              Sign in
            </h6>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
