import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { LOGO_URL, PROFILE, } from "../utils/constants";
import { removePopularMovies } from "../utils/movieSlice";

const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const name = useSelector((store) => store.user?.displayName)
  const photo = useSelector((store) => store.user?.photoURL)


  const handleSignOut = () => {
    signOut(auth).then(() => {
      dispatch(removeUser()) 
      dispatch(removePopularMovies()) 
    }).catch(() => {
      navigate("/Error")
    });
    
  }
  useEffect(() => {
  
   const unsubscribe =  onAuthStateChanged(auth, (user) => {
      if (user) { 
        const{uid,email,displayName,photoURL} = user;
        dispatch(addUser({uid:uid,displayName:displayName,email:email,photoURL:photoURL}));
        navigate("/Browse")
      } else {
        dispatch(removeUser());
        navigate("/")
      }
    });
  
  return () => {
    unsubscribe();
  }
} , []);
 
  
 
  
  return (
    <div className=" absolute px-2 md:px-8 py-1 w-full z-10 flex justify-between">
      <img 
          className="w-24 md:w-32 lg:w-48 mx-1 lg:mx-32 md:mx-16 sm:mx-1 my-0.5 saturate-150 "
          src={LOGO_URL}
          alt="logo"
        />
        <div className="flex col md:flex-row md:items-center md:justify-between md:gap-4">
          <div>
              <img className="w-10"
              src={photo?photo:`${PROFILE}`}/>
             <p className=" text-xl text-red-500">{name}</p>
              
          </div>
          {name && <div>
                <button onClick={handleSignOut}
                className = "text-3xl font-bold text-red-500"
                >Sign Out</button>
          </div>}
          
        </div>
    </div>
  );
};

export default Header;
