import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";
import { Link } from "react-router-dom";

function LoginPage() {
    const [state, setState] = useState({
      username: "",
      password: ""
    });

    function hanldeInputChange(event) {
        const field = event.target.name;
        setState({
          ...state,
          [field]: event.target.value
        })
    }

    function handleFormSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(state));
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
            <h6 className="text-red-600 italic text-sm">
              Username already existed. Please use another one!
            </h6>
            <Button
              className="w-full text-center p-3 bg-blue-400 text-sm rounded-md font-semibold"
              type="submit"
            >
              CONTINUE
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
