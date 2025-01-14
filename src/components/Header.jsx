const Header = () => {
  return (
    <div className=" absolute px-2 md:px-8 py-1 w-full z-10">
      <img 
          className="w-24 md:w-32 lg:w-48 mx-1 lg:mx-32 md:mx-16 sm:mx-1 my-0.5 saturate-150 "
          src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
          alt="logo"
        />
    </div>
  );
};

export default Header;
