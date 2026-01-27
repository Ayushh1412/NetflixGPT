import { useRef, useState } from "react";
import Header from "./Header";
import { validateSignInData } from "../utils/validate";
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { addUser} from "../utils/userSlice";
import { BG_IMAGE, PROFILE } from "../utils/constants";
import { lang } from "../utils/languageConstants";

const LoginPage = () => {
  const [signInForm, setSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const langKey = useSelector((store) => store.config.lang);

  const toggleSignInForm = () => {
    setSignInForm(!signInForm);
  };
  
  const dispatch = useDispatch();
  const email = useRef(null);
  const password = useRef(null);
  const fullName = useRef(null);
  const handleSignIn = () => {
    let message = null;
    if(!signInForm){
       message =  validateSignInData(
            email.current.value,
            password.current.value,
            fullName.current.value,
            "signup"
          )
          setErrorMessage(message)
  }
    else{
       message =  validateSignInData(
        email.current.value,
        password.current.value,
        null,
        "signin"
      )
      setErrorMessage(message)

    }
    
    if (message) return;
    if (signInForm) {
      //sign in logic
      signInWithEmailAndPassword(auth,email.current.value,password.current.value)
      .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;   
      const{uid,email,displayName,photoURL} = user;
      try{
        dispatch(addUser({uid:uid,displayName:displayName,email:email,photoURL:photoURL}));
      }
      catch(error){
        console.log(error);
      }
      // ...
      })
      .catch((error) => {
      const errorCode = error.code;
      errorCode? setErrorMessage(errorCode.substring(5)):1;
    });
    }
    else{
      //create user logic
      createUserWithEmailAndPassword(auth,email.current.value,password.current.value)
      .then(() => {
        // Signed up 
        updateProfile(auth.currentUser, {
          displayName: fullName.current.value, photoURL:`${PROFILE}`
        }).then(() => {
         const{uid,email,displayName,photoURL} = auth.currentUser;
         try{

           dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL }));
         }
         catch(error){
          console.log(error);
         }
          
        }).catch((error) => {
           console.log(error)

        });
        
       

        
      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        //..
        setErrorMessage(errorCode.substring(5))
      });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src = {BG_IMAGE}
          alt="logo"
          className="w-screen min-h-screen scale-125 brightness-0 md:brightness-50"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full md:w-[450px] absolute p-6 md:px-[70px] md:py-12 bg-black my-24 mx-auto right-0 left-0  text-white rounded-lg bg-opacity-70 "
      >
        <h1 className="font-bold text-[33px] mb-8">
          {signInForm ? lang[langKey].signIn : lang[langKey].signUp}
        </h1>
        {!signInForm && (
          <div className="relative">
            <input
              ref={fullName}
              type="text"
              id="fullName"
              className="block p-4 my-4 w-full bg-black bg-opacity-5 rounded-md inner-border-2 border-white peer"
              placeholder=""
              autoComplete="name"
            />
            <label
              htmlFor="fullName"
              className="absolute ml-2 text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/3 rtl:peer-focus:left-auto"
            >
              {lang[langKey].enterFullName}
            </label>
          </div>
        )}
        <div className="relative">
          <input
            type="text"
            ref={email}
            id="email"
            className="block p-4 my-4 w-full bg-black bg-opacity-5 rounded-md inner-border-2 border-white peer"
            placeholder=" "
            autoComplete="email"
          />
          <label
            htmlFor="email"
            className="absolute ml-2 text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/3 rtl:peer-focus:left-auto"
          >
            {lang[langKey].emailPlaceholder}
          </label>
        </div>
        <div className="relative">
          <input
            type="password"
            ref={password}
            id="password"
            className="block p-4 my-4 w-full bg-black bg-opacity-5 rounded-md inner-border-2 border-white peer"
            placeholder=" "
            autoComplete="password"
          />
          <label
            htmlFor="password"
            className="absolute ml-2 text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/3 rtl:peer-focus:left-auto"
          >
            {lang[langKey].passwordPlaceholder}
          </label>
        </div>
        <label className="inline-flex items-center cursor-pointer">
          <input type="checkbox" className=" size-4" />
          <span className="ml-3 text-base ">{lang[langKey].rememberMe}</span>
        </label>
        <p className=" font-bold py-4 text-red-700"> {errorMessage} </p>
        <button
          type="submit"
          onClick={handleSignIn}
          className="p-3 my-8 w-full font-medium text-base bg-red-600 rounded-lg"
        >
          {signInForm ? lang[langKey].signIn : lang[langKey].signUp}
        </button>
        <p className="py-4 text-base">
          <span className=" text-gray-300">
            {signInForm ? lang[langKey].newToNetflix : lang[langKey].alreadyMember}
          </span>
          <span
            className="font-bold cursor-pointer hover:underline"
            onClick={toggleSignInForm}
          >
            {signInForm ? lang[langKey].signUpNow : lang[langKey].signInNow}
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
