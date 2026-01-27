import { useRef, useState } from "react";
import Header from "./Header";
import { validateSignInData } from "../utils/validate";
import { auth, googleProvider } from "../utils/firebase";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth";
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

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((userCredential) => {
        const user = userCredential.user;
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            displayName: displayName,
            email: email,
            photoURL: photoURL,
          })
        );
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

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
        <div className="bg-yellow-600 bg-opacity-80 p-2 mb-4 rounded text-xs md:text-sm text-center font-bold text-black border border-yellow-500">
          Disclaimer: This is a student project for learning purposes only. It is NOT the official Netflix website and is not affiliated with Netflix. Do not enter your real Netflix credentials.
        </div>
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
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="p-3 mb-8 w-full font-medium text-base bg-white text-black rounded-lg hover:bg-gray-200 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Sign In with Google
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
