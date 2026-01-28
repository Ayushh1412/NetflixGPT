import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { PROFILE } from "../utils/constants";
import { removePopularMovies } from "../utils/movieSlice";
import { setGpt } from "../utils/gptSlice";
import logo from "../assets/netgpt.png";
import { changeLanguage } from "../utils/configSlice";
import { lang, SUPPORTED_LANGUAGES } from "../utils/languageConstants";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector((store) => store.user?.email);
  const name = useSelector((store) => store.user?.displayName);
  const photo = useSelector((store) => store.user?.photoURL);
  const langKey = useSelector((store) => store.config.lang);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      dispatch(removeUser());
      dispatch(removePopularMovies());
    }).catch(() => {
      navigate("/Error");
    });
  };
  const HandleGptButton = () => {
    dispatch(setGpt());
  }

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid: uid, displayName: displayName, email: email, photoURL: photoURL }));
        navigate("/Browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="absolute px-2 md:px-8 py-1 w-full z-10 flex flex-col md:flex-row justify-between bg-gradient-to-b from-black">
      <img
        className="w-40 md:w-48 mx-auto md:mx-0 py-2 saturate-150"
        src={logo}
        alt="logo"
      />
      {email && (
        <div className="flex flex-wrap justify-center md:justify-end items-center cursor-pointer gap-2 md:gap-4">
          <div className="p-2">
            <select
              className="px-2 md:px-4 py-1 rounded bg-gray-900 text-white text-sm md:text-base"
              onChange={handleLanguageChange}
              value={langKey}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
          <div className="p-2">
            <button
              onClick={HandleGptButton}
              className="text-sm md:text-base px-3 md:px-4 py-1 bg-purple-800 text-white rounded hover:bg-opacity-80 transition-all"
            >
              {lang[langKey].gptSearch}
            </button>
          </div>
          <div className="p-2">
            <button
              onClick={handleSignOut}
              className="text-sm md:text-base px-3 md:px-4 py-1 bg-red-600 text-white rounded hover:bg-opacity-80 transition-all"
            >
              {lang[langKey].signOut}
            </button>
          </div>
          <div className="flex flex-col items-center ml-2">
            <img
              className="w-8 md:w-10 rounded-sm"
              src={photo || PROFILE}
              alt="user-icon"
              referrerPolicy="no-referrer"
            />
            <p className="text-xs md:text-sm font-bold text-white hidden md:block">
              {name?.split(" ").slice(0, 1).join(" ") || name}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
