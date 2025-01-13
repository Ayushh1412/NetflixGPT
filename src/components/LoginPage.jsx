import { useState } from "react";
import Header from "./Header";
const LoginPage = () => {
  const [signInForm, setSignInForm] = useState(true);
  const toggleSignInForm = () => {
    setSignInForm(!signInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/154a9550-ce07-4e28-819c-63185dd849f8/web/IN-en-20250106-TRIFECTA-perspective_27b02e7c-f668-4639-9e82-1a5485084b2a_large.jpg"
          alt="logo"
          className="w-screen min-h-screen scale-125 brightness-0 md:brightness-50"
        />
      </div>
      <form className="w-full md:w-[600px] absolute p-6 md:p-24 bg-black my-36 mx-auto right-0 left-0  text-white rounded-lg bg-opacity-70 ">
        <h1 className="font-bold text-5xl mb-8">
          {signInForm ? "Sign In" : "Sign Up"}
        </h1>
        <div className="relative">
          <input
            type="text"
            id="email"
            className="block p-6 my-4 w-full bg-black bg-opacity-5 rounded-md inner-border-2 border-white peer"
            placeholder=" "
            autoComplete="email"
          />
          <label
            htmlFor="email"
            className="absolute ml-3 text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Email or mobile number
          </label>
        </div>
        <div className="relative">
          <input
            type="password"
            id="password"
            className="block p-6 my-4 w-full bg-black bg-opacity-5 rounded-md inner-border-2 border-white peer"
            placeholder=" "
            autoComplete="password"
          />
          <label
            htmlFor="password"
            className="absolute ml-3 text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Password
          </label>
        </div>
        <label className="inline-flex items-center cursor-pointer">
          <input type="checkbox"  className=" size-6"/>
          <span className="ml-3 text-xl ">Remember me</span>
        </label>
        <button
          type="submit"
          className="p-6 my-8 w-full font-medium text-xl bg-red-600 rounded-lg"
        >
          {signInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 text-xl">
          <span className=" text-gray-300">
            {signInForm ? "New to NetFlix? " : "Already a member? "}
          </span>
          <span
            className="font-bold cursor-pointer hover:underline"
            onClick={toggleSignInForm}
          >
            {signInForm ? "Sign up now." : "Sign In."}
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
