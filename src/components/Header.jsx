import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { LOGO_URL, PROFILE } from "../utils/constants";
import { removePopularMovies } from "../utils/movieSlice";
import { setGpt } from "../utils/gptSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector((store) => store.user?.email);
  const name = useSelector((store) => store.user?.displayName);
  const photo = useSelector((store) => store.user?.photoURL);

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
    <div className="absolute px-2 md:px-8 py-1 w-full z-10 flex justify-between">
      <img
        className="w-24 md:w-32 lg:w-48 mx-1 lg:mx-32 md:mx-16 sm:mx-1 my-0.5 saturate-150"
        src={LOGO_URL}
        alt="logo"
      />
      <div className="inline-flex items-center cursor-pointer gap-2 ">
        <div className="px-4 py-2 -mr-2 ">
          <select className="px-4 py-1 rounded">
            <option>English</option>
            <option>Hindi</option>
            <option>Chinese</option>
          </select>
        </div>
        {email && <div className="px-4 py-2 ">
          <button
          onClick={HandleGptButton}
          className="text-base  px-4 py-1  bg-red-600 text-white rounded hover:bg-slate-700 hover:scale-95 bg-opacity-70  transition-all">GPT Search</button>
        </div>}
        <div className=" mr-4">
          {email && (
            <div>
              <button onClick={handleSignOut} className="text-base  px-4 py-1  bg-red-600 text-white rounded hover:bg-slate-700 hover:scale-95 bg-opacity-70 transition-all">
                Sign Out
              </button>
            
            </div>
           )}
        </div>
        <div className = {email?"translate-y-3":""}>
          <img className="w-10"
          //  src= {photo ? photo : `${PROFILE}`}
           src={PROFILE}
           />
         <p className="text-base font-bold  text-red-500">{name?.split(' ').slice(0, -1).join(' ') || name}</p>
        </div>
        
        
      </div>
    </div>
  );
};

export default Header;
